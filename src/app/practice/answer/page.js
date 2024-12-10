"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import micIcon from "../../../../public/icons/mic.svg";
import lockIcon from "../../../../public/icons/lock.svg";
import AI5 from "../../../../public/ai5.svg";
import useInterviewStore from "@/store/useInterviewStore";
import axios from "axios";

export default function AnswerPage() {
  const [isRecording, setIsRecording] = useState(true); // 녹음 시작 상태
  const [timer, setTimer] = useState(0); // 타이머 시간
  const [isViewingQuestion, setIsViewingQuestion] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 인덱스
  const [audioContext, setAudioContext] = useState(null); // AudioContext 저장
  const [audioLoading, setAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // 재생 상태 추가
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); // 모든 질문 완료 여부
  const { questions } = useInterviewStore();
  const router = useRouter(); // 홈으로 이동용
  let timerId = null;

  useEffect(() => {
    if (isRecording) {
      timerId = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => {
      clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 클리어
    };
  }, [isRecording]);

  const handleStopRecording = async () => {
    setIsRecording(false); // 녹음 정지
    clearInterval(timerId); // 타이머 정지
    setTimer(0); // 시간 초기화
    setIsViewingQuestion(false); // 질문 보기 비활성화
    if (currentQuestionIndex + 1 < questions.length) {
      await playTTS(questions[currentQuestionIndex + 1]); // 다음 질문 TTS 재생
      setCurrentQuestionIndex((prev) => prev + 1); // 다음 질문으로 이동
      setTimer(0); // 타이머 초기화
    } else {
      setAllQuestionsAnswered(true); // 모든 질문 완료
    }
  };

  const playTTS = async (text) => {
    if (!text) return;
    setAudioLoading(true);
    setIsPlaying(true);

    try {
      // TTS API 호출
      const response = await axios.post("/api/tts", { text });
      const audioUrl = response.data.audioUrl;

      // Web Audio API 사용
      const context = audioContext || new window.AudioContext();
      setAudioContext(context);

      const responseAudio = await fetch(audioUrl);
      const audioData = await responseAudio.arrayBuffer();

      // 디코딩된 오디오 데이터를 재생
      const decodedData = await context.decodeAudioData(audioData);
      const source = context.createBufferSource();
      source.buffer = decodedData;
      source.connect(context.destination);

      // AudioContext 활성화
      await context.resume();

      // 실제 오디오 재생
      source.start(context.currentTime);

      // 실제 오디오 재생 완료 후 상태 변경
      source.onended = () => {
        setIsPlaying(false);
        setIsRecording(true); // 녹음 다시 시작
      };
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
      alert("TTS 생성 중 오류가 발생했습니다.");
      setIsPlaying(false);
    } finally {
      setAudioLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (allQuestionsAnswered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <h1 className="text-3xl font-bold text-gray-800">모든 질문이 완료되었습니다!</h1>
        <p className="text-lg text-gray-600 mt-4">수고하셨습니다. 모든 질문이 완료되었습니다.</p>
        <button
          onClick={() => router.push("/")}
          className="text-2xl bg-[#0F2F70] text-white font-semibold rounded-full px-12 py-6 hover:bg-[#0D265E] mt-6"
        >
          홈으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <Image src={AI5} alt="avatar" />

        {/* Question Button */}
        <button
          onClick={() => setIsViewingQuestion(!isViewingQuestion)}
          className={`flex items-center justify-center bg-[#F6F6F7] px-12 py-3 rounded-3xl mt-8 ${
            audioLoading || isPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={audioLoading || isPlaying} // TTS 생성 중 또는 재생 중 버튼 비활성화
        >
          {isViewingQuestion ? (
            <div className="text-[#4A4A4A] text-base font-medium py-3">
              {questions[currentQuestionIndex]}
            </div>
          ) : (
            <div className="flex flex-row items-center text-black font-semibold text-lg">
              <Image
                src={lockIcon}
                alt="lock"
                width={42}
                height={42}
                className="mr-3"
              />
              질문 보기
            </div>
          )}
        </button>

        {/* Recording Controls */}
        <div className="flex items-center justify-between mt-8 px-8 py-5 bg-white border-2 rounded-full gap-4">
          <div className="flex items-center">
            <Image src={micIcon} alt="mic" width={24} height={24} className="mr-2" />
            <span className={`${isRecording ? "text-red-500" : "text-gray-500" } font-medium`}>
              {isRecording ? "녹화 중" : audioLoading ? "대기 중" : "질문 중입니다. 답변을 준비하세요."}
            </span>
          </div>
          <span className="text-gray-800 font-semibold">{formatTime(timer)}</span>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              isRecording
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500"
            }`}
            onClick={isRecording ? handleStopRecording : undefined}
            disabled={audioLoading || isPlaying}
          >
            {isRecording ? "답변 완료" : audioLoading ? "다음 질문 준비 중" : "응답 대기"}
          </button>
        </div>
      </div>
    </div>
  );
}
