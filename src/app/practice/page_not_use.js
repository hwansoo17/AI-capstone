"use client";
import { useState } from "react";
import QuestionItem from "./questionItem";
export default function Home() {
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [recruitmentDetails, setRecruitmentDetails] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setQuestions([]); // 이전 질문 초기화

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selfIntroduction, recruitmentDetails, maxQuestions: 3 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("질문 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-[1280px] mx-auto">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">AI 면접 질문 생성기</h1>
        <textarea
          className="w-full h-32 p-2 border rounded-md text-slate-950"
          placeholder="자소서를 입력하세요."
          value={selfIntroduction}
          onChange={(e) => setSelfIntroduction(e.target.value)}
        ></textarea>
        <textarea
          className="w-full h-32 p-2 border rounded-md text-slate-950"
          placeholder="모집요강을 입력하세요."
          value={recruitmentDetails}
          onChange={(e) => setRecruitmentDetails(e.target.value)}
        ></textarea>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleGenerateQuestions}
          disabled={loading}
        >
          {loading ? "질문 생성 중..." : "질문 생성"}
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold">생성된 질문</h2>
          {questions.length > 0 ? (
            <ul className="list-disc pl-5">
              {questions.map((question, index) => (
                <li key={index}>
                  <QuestionItem text={question} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">질문이 아직 생성되지 않았습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
}
