import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 가져오기
});

// POST 메서드 처리
export async function POST(req) {
  try {
    const body = await req.json(); // 요청 본문 파싱
    const { applyedJob, requiredCompetency, preferentialTreatment, idealTalent, selfIntroduction, category, maxQuestions = 3 } = body;

    const formattedSelfIntroduction = selfIntroduction
      .map(
        (item, index) =>
          `문항 ${index + 1}: ${item.question}\n문항 ${index + 1} 답변: ${item.answer}\n`
      )
      .join("\n");
    if (!selfIntroduction || !applyedJob) {
      return new Response(
        JSON.stringify({ error: "자소서와 지원 직무는 필수로 입력해야합니다." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log(applyedJob, requiredCompetency, preferentialTreatment, idealTalent, formattedSelfIntroduction, category, maxQuestions);
    const prompt = `
      모집요강: 
      - 지원 직무:${applyedJob}
      - 필요 역량:${requiredCompetency}
      - 우대 사항:${preferentialTreatment}
      - 인재상:${idealTalent}

      자소서:${formattedSelfIntroduction}

      위 정보를 기반으로 ${category}하는 면접 질문 ${maxQuestions}개를 작성해줘.
      질문 이외의 다른 말은 하지 마.
    `;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300, // 토큰 제한
      messages: [
        {"role": "system", "content": "너는 기업 면접관이야."},
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0]?.message?.content || "";
    const questions = content
      .split("\n")
      .filter((line) => line.trim() !== "") // 빈 줄 제거
      .slice(0, maxQuestions); // 최대 질문 개수 제한

    return new Response(JSON.stringify({ questions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({ error: "질문 생성 중 오류가 발생했습니다." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
