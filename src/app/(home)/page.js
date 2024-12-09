import Image from "next/image";
import Ai from "../../../public/ai.svg";
import Link from "next/link";
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
      
    </div>
  );
}
