"use client";
import { useState } from "react";
import Image from "next/image";
import micIcon from "../../../../public/icons/mic.svg";
import lockIcon from "../../../../public/icons/lock.svg";
import AI5 from "../../../../public/ai5.svg";
import useInterviewStore from "@/store/useInterviewStore";
export default function AnswerPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isViewingQuestion, setIsViewingQuestion] = useState(false);

  const { questions } = useInterviewStore();

  const handleStartRecording = () => {
    setIsRecording(true);

    // 타이머 시작
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleStopRecording = () => {
    setIsRecording(false);

    // 타이머 정지
    clearInterval(intervalId);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-white">
      {/* Main Content */}
      <div className="flex flex-col items-center ">
        {/* Avatar */}
        <Image src={AI5} alt="avatar"/>

        {/* Question Button */}
        <button
          onClick={() => setIsViewingQuestion(!isViewingQuestion)}
          className="flex items-center justify-center bg-[#F6F6F7] px-12 py-3 rounded-3xl mt-8"
          // disabled={!isRecording} // 녹음 중에만 활성화
        >
          {isViewingQuestion ?
          <div className="text-[#4A4A4A] text-base font-medium py-3">
            {questions[0]}
          </div>
          :
          <div className="flex flex-row items-center text-black font-semibold text-lg">
            <Image src={lockIcon} alt="lock" width={42} height={42} className="mr-3" />
            질문 보기
          </div>}
        </button>

        {/* Image */}
        <div className="mt-8">
          {/* <Image
            src={sampleImage}
            alt="interview scene"
            width={600}
            height={400}
            className="rounded-xl shadow"
          /> */}
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-between mt-8 px-8 py-5 bg-white border-2 rounded-full gap-4">
          <div className="flex items-center">
            <Image src={micIcon} alt="mic" width={24} height={24} className="mr-2" />
            <span className="text-red-500 font-medium">
              {isRecording ? "녹화 중" : "대기 중"}
            </span>
          </div>
          <span className="text-gray-800 font-semibold">{formatTime(timer)}</span>
          <button
            className={`px-4 py-2 rounded-lg font-bold ${
              isRecording
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500"
            }`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? "답변 완료" : "녹음 시작"}
          </button>
        </div>
      </div>
    </div>
  );
}
