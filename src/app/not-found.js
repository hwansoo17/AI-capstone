import Link from 'next/link'
import waitingIcon from '../../public/icons/waiting.svg'
import Image from 'next/image'
export default function NotFound() {
  return (
    <div className="w-full bg-white items-center">
      <div className="max-w-[1280px] min-w-[1000px] mx-auto flex flex-col items-center gap-4 px-32 py-12 justify-between">
        <Image src={waitingIcon} alt="waiting" className='mt-2'/>
        <h1 className="font-bold text-3xl text-gray-800 mt-8">
        현재 페이지 준비중이에요!
        </h1>
        <p className="font-medium text-xl text-[#949494] mt-3 text-center">
        이용에 불편을 드려 죄송합니다<br/>더 나은 서비스를 제공하기 위해 노력하겠습니다
        </p>
        {/* <Link href="/" className='text-black'>
          홈으로 돌아가기
        </Link> */}
        <div className="flex justify-center mt-20">
          <Link 
            href="/"
            className="text-2xl bg-[#0F2F70] text-white font-semibold rounded-full px-12 py-6 hover:bg-[#0D265E]"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}