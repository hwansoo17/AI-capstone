"use client";
import { useState } from "react";
import Ai2 from "../../../../public/ai2.svg";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import useInterviewStore from "@/store/useInterviewStore";

export default function StartPage() {
  const router = useRouter();
  const {
    applyedJob,
    requiredCompetency,
    preferentialTreatment,
    idealTalent,
    selfIntroduction,
    setApplyedJob,
    setRequiredCompetency,
    setPreferentialTreatment,
    setIdealTalent,
    setSelfIntroduction,
  } = useInterviewStore();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleAddQuestion = () => {
    setSelfIntroduction([
      ...selfIntroduction,
      { question: "", answer: "" }, // 새로운 문항 추가
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setSelfIntroduction(selfIntroduction.filter((_, i) => i !== index));
  };


  const handleQuestionChange = (index, field, value) => {
    setSelfIntroduction(
      selfIntroduction.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };


  const validateInputs = () => {
    if (!applyedJob.trim()) {
      alert("지원 직무는 필수 입력값입니다.");
      return false;
    }

    const firstQuestion = selfIntroduction[0];
    if (!firstQuestion.question.trim()) {
      alert("자기소개서 첫 번째 문항은 필수 입력값입니다.");
      return false;
    }

    return true;
  };

  const handleStart = () => {
    if (!validateInputs()) return;

    router.push("/practice/category"); // 상태는 전역으로 관리되므로 query 없이 이동
  };

  const handleGenerateQuestions = async () => {
    if (!validateFirstQuestion()) return;

    setLoading(true);
    setQuestions([]); // 이전 질문 초기화

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applyedJob, requiredCompetency, preferentialTreatment, idealTalent, selfIntroduction, maxQuestions: 3 }),
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
    <div className="w-full items-center bg-[#E5EBF8]">
      <div className="w-full max-w-[1220px] mx-auto bg-white px-20 py-8">
        <div className="flex flex-col items-center mt-32">
          <Image src={Ai2} alt="Ai2" width={150}/>
          <p className="font-bold text-[36px] text-[#313131] mt-14">면접 준비에 필요한 자료를 입력해주세요</p>
          <p className="font-medium text-2xl text-[#949494] text-center mt-4">
            자기소개서를 기반으로 맞춤형 질문을 생성해드릴게요
          </p>
        </div>

        {/* 모집 요강 */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-[#0F2F70] mb-4 flex items-center">
            📑 모집 요강
          </h3>
          <div className="flex flex-col gap-4">
            <InputField 
              label="지원 직무" 
              placeholder="지원 직무를 입력해주세요 (예: 서비스 기획, 프론트엔드 개발자 등)" 
              required 
              value={applyedJob}
              setValue={setApplyedJob}
              />
            <InputField 
              label="필요 역량" 
              placeholder="해당 직무의 필요 역량에 대해 입력해주세요 (예: 웹/앱 기획 경험, 배우고자 하는 열정 등)"
              value={requiredCompetency}
              setValue={setRequiredCompetency}
              />
            <InputField label="우대 사항" placeholder="우대 사항을 입력해주세요 (예: 앱 배포 경험, 컴퓨터공학 전공 등)" 
              value={preferentialTreatment}
              setValue={setPreferentialTreatment}
            />
            <InputField label="인재상" placeholder="기업 인재상을 입력해주세요 (예: 책임감, 사용자 중심 등)" 
              value={idealTalent}
              setValue={setIdealTalent}
            />
          </div>
        </div>

        {/* 자기소개서 */}
        <div className="mb-8">
          <h3 className="font-bold text-lg text-[#0F2F70] mb-4 flex items-center">
            ✏️ 자기소개서
          </h3>
          <div className="flex flex-col gap-4">
            {selfIntroduction.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="block text-gray-700 font-medium">
                  {index + 1}번 문항  {index === 0 && <span className="text-red-500">*</span>}
                  </label>
                  {index > 0 && (
                    <button
                      className="text-red-500 hover:underline text-sm"
                      onClick={() => handleDeleteQuestion(index)}
                    >
                      삭제
                    </button>
                  )}
                </div>
                <InputField
                  placeholder="문항을 입력해주세요"
                  value={item.question}
                  setValue={(value) =>
                    handleQuestionChange(index, "question", value)
                  }
                />
                <TextareaField
                  placeholder="답변을 입력해주세요"
                  value={item.answer}
                  setValue={(value) =>
                    handleQuestionChange(index, "answer", value)
                  }
                />
              </div>
            ))}
          </div>
          <button
            className="w-full mt-4 font-semibold text-lg bg-[#F6F6F7] text-[#949494] rounded-2xl py-4 hover:bg-gray-200"
            onClick={handleAddQuestion}
          >
            + 문항 추가하기
          </button>
        </div>

        {/* 시작하기 버튼 */}
        <div className="flex justify-center">
          <button 
            className="text-2xl bg-[#0F2F70] text-white font-semibold rounded-full px-12 py-6 hover:bg-[#0D265E]"
            onClick={handleStart}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, required, value, setValue }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-xl focus:outline-1 focus:outline-blue-500 text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

function TextareaField({ label, placeholder, value, setValue }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <textarea
        placeholder={placeholder}
        rows="8"
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
