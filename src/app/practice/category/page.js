"use client";
import Image from "next/image";
import Ai3 from "../../../../public/ai3.svg";
import bag from "../../../../public/icons/bag.svg";
import sprout from "../../../../public/icons/sprout.svg";
import target from "../../../../public/icons/target.svg";
import checkIcon from "../../../../public/icons/check.svg"; // 체크 아이콘 추가
import useInterviewStore from "@/store/useInterviewStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

 const SelectedItemUI = () => {
  return(
    <>
      <div className="flex justify-center">
        <Image src={checkIcon} alt="check" width={70}/>
      </div>
      <h2 className="font-bold text-3xl text-gray-800 text-center mt-2">
        선택 완료
      </h2>
      <p className="text-base text-gray-600 mt-2 text-center">
        잠시만 기다려주세요...
      </p>
    </>
)}

export default function CategorySelectPage() {
  const router = useRouter();

  const {
    applyedJob,
    requiredCompetency,
    preferentialTreatment,
    idealTalent,
    selfIntroduction,
    setQuestions,
  } = useInterviewStore();

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleGenerateQuestions = async (category) => {
    setLoading(true);
    setSelectedCategory(category); // 현재 선택된 카테고리 설정
    setQuestions([]); // 이전 질문 초기화

    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applyedJob,
          requiredCompetency,
          preferentialTreatment,
          idealTalent,
          selfIntroduction,
          category,
          maxQuestions: 3,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      const data = await response.json();
      setQuestions(data.questions);
      router.push("/practice/question");
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("질문 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      setSelectedCategory(null); // 요청 종료 후 선택 상태 초기화
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 pb-8 bg-white w-full">
      <div className="flex flex-col items-center">
        <Image src={Ai3} alt="ai3" width={190} />
        <h1 className="font-bold text-3xl text-gray-800 mt-8">
          연습할 질문 카테고리를 선택해주세요
        </h1>
        <p className="font-medium text-xl text-[#949494] mt-3 text-center">
          비슷한 유형의 질문을 모아 연습해봐요. 선택 시 곧바로 면접이 시작됩니다!
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-8 max-w-[1220px]">
        {/* Category 1 */}
        <button
          className={`bg-[#ECF1FA] p-12 rounded-3xl hover:shadow-lg transition`}
          onClick={() =>
            handleGenerateQuestions(
              "경험 및 직무 경험을 바탕으로 직무와의 적합성 및 전문성 평가"
            )
          }
          disabled={loading}
        >
          {selectedCategory ===
          "경험 및 직무 경험을 바탕으로 직무와의 적합성 및 전문성 평가" ? (
            <SelectedItemUI />
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <Image src={bag} alt="bag" width={42} />
              </div>
              <h2 className="font-bold text-2xl text-gray-800 text-center">
                경험 및 직무 역량
              </h2>
              <p className="text-base text-gray-600 mt-2 text-center">
                경험을 바탕으로 직무와의
                <br />
                적합성 및 전문성 평가
              </p>
            </>
          )}
        </button>

        {/* Category 2 */}
        <button
          className={`bg-[#EBFFF7] p-12 rounded-3xl hover:shadow-lg transition`}
          onClick={() =>
            handleGenerateQuestions(
              "성격, 대인 관계 능력, 협업 태도 등을 평가하여 조직 적합성 판단"
            )
          }
          disabled={loading}
        >
          {selectedCategory ===
          "성격, 대인 관계 능력, 협업 태도 등을 평가하여 조직 적합성 판단" ? (
            <SelectedItemUI />
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <Image src={sprout} alt="sprout" width={42} />
              </div>
              <h2 className="font-bold text-2xl text-gray-800 text-center">
                인성
              </h2>
              <p className="text-base text-gray-600 mt-2 text-center">
                성격, 대인 관계 능력, 협업 태도 등을
                <br />
                평가하여 조직 적합성 판단
              </p>
            </>
          )}
        </button>

        {/* Category 3 */}
        <button
          className={`bg-[#F6F6F7] p-12 rounded-3xl hover:shadow-lg transition`}
          onClick={() =>
            handleGenerateQuestions(
              "지원 동기와 개인의 목표 및 가치관이 회사와 부합하는지 평가"
            )
          }
          disabled={loading}
        >
          {selectedCategory ===
          "지원 동기와 개인의 목표 및 가치관이 회사와 부합하는지 평가" ? (
            <SelectedItemUI />
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <Image src={target} alt="target" width={42} />
              </div>
              <h2 className="font-bold text-2xl text-gray-800 text-center">
                지원 동기 및 가치관
              </h2>
              <p className="text-base text-gray-600 mt-2 text-center">
                지원 동기와 개인의 목표 및 가치관이
                <br />
                회사와 부합하는지 평가
              </p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

