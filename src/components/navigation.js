"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import homeIcon from "../../public/icons/home.svg";
import micIcon from "../../public/icons/mic.svg";
import lightIcon from "../../public/icons/light.svg";
import bubbleIcon from "../../public/icons/bubble.svg";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();
  const linkStyle = (href) =>
    pathname === href
      ? "font-semibold text-[#000000] text-base flex gap-2 items-center"
      : "font-medium text-[#4f5d8d] text-base hover:text-[#000000] flex gap-2 items-center";

  if (pathname === "/login" || pathname === "/signup" || pathname === "/practice/start" || pathname === "/practice/category" || pathname === "/practice/question" || pathname === "/practice/answer") {
    return null;
  }

  return (
    <div className="bg-white">
      {/* 상단 영역 */}
      <div className="flex flex-col md:max-w-[1280px] mx-auto px-5 py-4">
        <div className="flex justify-between">
          {/* 로고 */}
          <Link href="/" className="font-GmarketSansBold text-2xl text-[#104AC0]">
            Q&AI
          </Link>
          {/* 로그인 / 회원가입 */}
          <ul className="flex gap-4">
            <li>
              <Link href="/mypage" className=" font-regular text-[14px] text-[#313131] hover:text-blue-600">
                마이페이지
              </Link>
            </li>
            <li>
              <Link href="/signup" className="font-regular text-[14px] text-[#313131] hover:text-blue-600">
                회원가입
              </Link>
            </li>
            <li>
              <Link href="/login" className="font-bold text-[14px] text-[#104AC0] border-[1px] border-[#104AC0] px-[14px] py-2 rounded-[10px] ml-4">
                로그인
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* 네비게이션 영역 */}
      <nav className="bg-white">
        <ul className="container mx-auto md:max-w-[1280px] px-5 py-4 flex flex-row gap-16">
          <li className="">
            
            <Link href="/" className={linkStyle("/")}>
              <Image src={homeIcon} alt="home" />
              홈
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            
            <Link href="/practice/start" className={linkStyle("/practice")}>
              <Image src={micIcon} alt="mic" />
              면접 연습
            </Link>
          </li>
          {/* <li className="flex gap-2 items-center">
            
            <Link href="/tips" className={linkStyle("/tips")}>
              <Image src={lightIcon} alt="light" />
              면접 팁
            </Link>
          </li> */}
          <li className="flex gap-2 items-center">
            
            <Link href="/community" className={linkStyle("/community")}>
              <Image src={bubbleIcon} alt="bubble" />
              커뮤니티
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
