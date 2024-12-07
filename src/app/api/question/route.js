import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 환경 변수에서 API 키 가져오기
});

// POST 메서드 처리
export async function POST(req) {
  try {
    const body = await req.json(); // 요청 본문 파싱
    const { selfIntroduction, recruitmentDetails, maxQuestions = 3 } = body;

    if (!selfIntroduction || !recruitmentDetails) {
      return new Response(
        JSON.stringify({ error: "자소서와 모집요강이 필요합니다." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `
      자소서: ${selfIntroduction}
      모집요강: ${recruitmentDetails}
      위 정보를 기반으로 면접 질문 ${maxQuestions}개를 작성해줘.
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
