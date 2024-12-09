"use client";
import useInterviewStore from "@/store/useInterviewStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AI4 from "../../../../public/ai4.svg";
import Image from "next/image";

export default function QuestionPage() {
  const { questions } = useInterviewStore();
  const router = useRouter();
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가

  // 질문이 없을 경우 카테고리 선택 페이지로 돌아가기
  if (questions.length === 0) {
    router.push("/practice/category");
    return null;
  }

  const handlePlayTTS = async () => {
    if (!questions[0]) return;

    setAudioLoading(true);
    setIsPlaying(true); // 재생 중 상태로 설정
    try {
      // 첫 번째 질문을 TTS로 변환
      const response = await axios.post("/api/tts", { text: questions[0] });
      const audioUrl = response.data.audioUrl;
      setAudioUrl(audioUrl);

      // 오디오 객체 생성 및 이벤트 처리
      const audioObject = new Audio(audioUrl);

      // 오디오 로드 완료 후 재생
      audioObject.addEventListener("canplaythrough", () => {
        audioObject.play();
      });

      audioObject.onended = () => {
        // 재생이 끝나면 다음 페이지로 이동
        setIsPlaying(false);
        router.push("/practice/answer");
      };

      audioObject.play();
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
      alert("TTS 생성 중 오류가 발생했습니다.");
      setIsPlaying(false);
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[1220px] mx-auto px-8 py-16">
        <div className="flex flex-col items-center">
          <Image src={AI4} alt="ai4" />
          <h1 className="font-bold text-3xl text-gray-800 mt-8">
            제 질문을 잘 듣고 응답해주세요
          </h1>
          <p className="font-medium text-xl text-[#949494] mt-3 text-center">
            질문이 끝나면 응답 페이지로 이동합니다. 미리 답변을 생각해봐요!
          </p>
        </div>

        <div className="flex justify-center mt-20">
        <button
            className={`text-2xl font-semibold rounded-full px-12 py-6 ${
              audioLoading || isPlaying
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-[#0F2F70] text-white hover:bg-[#0D265E]"
            }`}
            onClick={handlePlayTTS}
            disabled={audioLoading || isPlaying}
          >
            {audioLoading ? "음성 생성 중..." : "질문 듣기"}
          </button>
        </div>
        

        {/* <button
          className="mt-6 text-white bg-gray-600 hover:bg-gray-700 px-8 py-4 rounded-lg text-lg font-semibold"
          onClick={() => router.push("/practice/category")}
        >
          다시 연습하기
        </button> */}
      </div>
    </div>
  );
}
