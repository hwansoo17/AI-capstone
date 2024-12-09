import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full bg-white items-center px-5">
      <div className="max-w-[1280px] min-w-[1000px] mx-auto flex flex-col items-center gap-4 px-32 py-14 justify-between">
        <h2>준비중 입니다</h2>
        <Link href="/" className='text-black'>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}