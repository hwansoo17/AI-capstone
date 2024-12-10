import Image from "next/image";
import Ai from "../../../public/ai.svg";
import Link from "next/link";
import fileIcon from "../../../public/icons/file.svg";
import magnifierIcon from "../../../public/icons/magnifier.svg";
import cameraIcon from "../../../public/icons/camera.svg";
import graphIcon from "../../../public/icons/graph.svg";
import arrowIcon from "../../../public/icons/arrow.svg";

export default function Home() {
  return (
    <div className="w-full bg-[#ECF1FA] h-96 items-center px-5">
      <div className="max-w-[1280px] min-w-[1000px] mx-auto flex flex-row gap-4 px-32 py-14 justify-between">
        <div className="flex flex-col gap-4">
          <p className="font-bold text-5xl leading-tight text-[#000000]">셀프 면접 연습하고<br/>취뽀하자!</p>
          <p className="font-medium text-2xl text-[#000000]">AI 면접 질문 생성기를 통해 면접을 준비하세요.</p>
          <div className="flex mt-4">
            <Link href="/practice/start" className="font-semibold bg-[#0F2F70] text-white text-[20px] leading-6 px-8 py-5 rounded-full">면접 연습 바로가기</Link>
          </div>
        </div>
        <Image 
        src={Ai}
        alt="ai"
        width={230}
        />
      </div>
      <div className="flex flex-col items-center mt-20 max-w-[1280px] min-w-[1000px] mx-auto">
        <h1 className="font-bold text-3xl text-gray-800 mt-8 text-center">
          인공지능 ‘아이’가 면접 준비를 도와드릴게요!
        </h1>
        <p className="font-medium text-xl text-[#949494] mt-3 text-center">
          자기소개서 기반 맞춤형 질문으로 면접을 응시하고 분석 결과를 받아보세요
        </p>
      </div>
      <div className="flex gap-8 mt-12 px-32 py-9 pb-12 max-w-[1220px] min-w-[1000px] mx-auto justify-between">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={fileIcon} alt="file"/>
          <div className="font-medium text-2xl text-black">
            자료 입력
          </div>
        </div>
        <Image src={arrowIcon} alt="arrow"/>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={magnifierIcon} alt="magnifier"/>
          <div className="font-medium text-2xl text-black">
            질문 선택
          </div>
        </div>
        <Image src={arrowIcon} alt="arrow"/>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={cameraIcon} alt="camera"/>
          <div className="font-medium text-2xl text-black">
            면접 응시
          </div>
        </div>
        <Image src={arrowIcon} alt="arrow"/>
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src={graphIcon} alt="graph"/>
          <div className="font-medium text-2xl text-black">
            결과 확인
          </div>
        </div>
      </div>
      
    </div>
  );
}
