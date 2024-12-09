import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
    <div className="bg-white w-full absolute">
      <div className="md:max-w-full mx-auto px-5 py-3 border-b-[#EBEBEB] border-b-[1px]">
        <div className="flex justify-between items-center">
          <div style={{ userSelect: "none" }} className="font-bold text-[14px] text-white border-[1px] border-white px-[16px] py-2 rounded-[10px] ml-4">
            그만두기
          </div>
          {/* 로고 */}
          <div className="flex flex-row items-center gap-4">
            <div className="font-GmarketSansBold text-[24px] leading-8 text-[#104AC0] mt-[3px]">
              Q&AI
            </div>
            <div className="font-semibold text-[24px] leading-8 text-[#949494]">
              면접 연습
            </div>
          </div>
          <Link href="/" className="font-bold text-[14px] bg-[#104AC0] text-white px-[16px] py-2 rounded-[10px] ml-4 hover:bg-[#0D3990]">
            그만두기
          </Link>
        </div>
      </div>
    </div>
      {/* Other Layout UI */}
      <main>{children}</main>
    </>
  )
}