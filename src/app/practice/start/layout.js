import Link from "next/link";
import BackIcon from "../../../../public/icons/back.svg";
import Image from "next/image";
export default function Layout({ children }) {
  return (
    <>
    <div className="bg-white w-full absolute">
      <div className="md:max-w-full mx-auto px-5 py-3 border-b-[#EBEBEB] border-b-[1px]">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={BackIcon} alt="back" width={24} height={24}/>
          </Link>
          {/* 로고 */}
          <div className="flex flex-row items-center gap-4">
            <div className="font-GmarketSansBold text-[24px] leading-8 text-[#104AC0] mt-[3px]">
              Q&AI
            </div>
            <div className="font-semibold text-[24px] leading-8 text-[#949494]">
              면접 연습
            </div>
          </div>
          <div className="w-6"/>
        </div>
      </div>
    </div>
      {/* Other Layout UI */}
      <main>{children}</main>
    </>
  )
}