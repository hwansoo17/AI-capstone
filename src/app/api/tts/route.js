import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json(); // 요청 데이터 파싱
    const { text } = body;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = {
      actor_id: "653220349ba8419521ae8a63",
      text: `__${text.substr(2)}`,
      lang: "auto",
      tempo: 1,
      volume: 100,
      pitch: 0,
      xapi_hd: true,
      max_seconds: 60,
      model_version: "latest",
      xapi_audio_format: "mp3",
      emotion_tone_preset: "normal-2",
    };

    const config = {
      method: "post",
      url: "https://typecast.ai/api/speak",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TYPECAST_API_KEY}`,
      },
      data: data,
    };

    // 음성 합성 요청
    const response = await axios.request(config);
    const speakUrl = response.data.result.speak_v2_url;

    // 폴링 시작
    const generatedAudioUrl = await pollSpeakStatus(speakUrl);

    // 성공적으로 생성된 URL 반환
    return new Response(
      JSON.stringify({ audioUrl: generatedAudioUrl }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("TTS 생성 중 오류:", error);
    return new Response(
      JSON.stringify({ error: "TTS 생성 중 오류가 발생했습니다." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// 폴링 함수
const pollSpeakStatus = async (url) => {
  try {
    while (true) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.TYPECAST_API_KEY}`,
        },
      });

      const { status, audio_download_url } = response.data.result;
      if (status === "done") {
        return audio_download_url; // 상태가 done이면 오디오 URL 반환
      }

      if (status === "failed") {
        throw new Error("음성 합성 실패");
      }

      // 1초 대기
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  } catch (error) {
    console.error("폴링 중 오류:", error);
    throw error;
  }
};
