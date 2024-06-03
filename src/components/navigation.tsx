import { useRouter } from 'next/router';
import { RiHome2Line, RiTestTubeLine, RiCommunityLine, RiUser3Line, RiGovernmentLine } from '@remixicon/react';

export const DrawerNavigation = () => {
  const router = useRouter();
  return (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
      <aside className="flex-col h-screen px-4 overflow-y-auto bg-white border-r py-7 rounded-mdflex w-65 md:w-30 sm:w-38 rtl:border-r-0 rtl:border-l dark:bg-netural-900 dark:border-netural-700">
        <div className="flex flex-col items-center justify-center mt-6 first-line:text-netural-600 ">
          <img className="w-auto h-12 px-2 sm:h-15" src="/free-icon-agreement-3375267.png" alt="로고이미지"/>
          <h3 className="font-bold text-netural-500 ">위기의 대한민국</h3>
          <p className="font-bold text-netural-400 ">스마트한 정치 정보 전달 플랫폼</p>
          </div>

<div className="flex flex-col justify-between flex-1 mt-3">
  <nav>
    <a className="flex items-center px-4 py-8 mt-5 transition-colors duration-300 transform rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 hover:text-neutral-700" onClick={() => router.push('/')}>
      <RiHome2Line className="w-7 h-7" />
      <h4 className="font-bold mx-7">홈</h4>
    </a>

    <a className="flex items-center px-4 py-8 mt-4 transition-colors duration-300 transform rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 hover:text-neutral-700" onClick={() => router.push('/publics/quiz/main')}>
      <RiTestTubeLine className="w-7 h-7" />
      <h4 className="font-bold mx-7">정치 성향 테스트</h4>
    </a>

    <a className="flex items-center px-4 py-8 mt-4 transition-colors duration-300 transform rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 hover:text-neutral-700" onClick={() => router.push('/community')}>
      <RiCommunityLine className="w-7 h-7" />
      <h4 className="font-bold mx-7">커뮤니티</h4>
    </a>

    <a className="flex items-center px-4 py-8 mt-4 transition-colors duration-300 transform rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 hover:text-neutral-700" onClick={() => router.push('/publics/quiz/main')}>
      <RiGovernmentLine className="w-7 h-7" />
      <h4 className="font-bold mx-7">위기의 대한민국</h4>
    </a>

    <hr className="my-6 border-neutral-200 dark:border-neutral-600" />

    <a className="flex items-center px-4 py-8 mt-4 transition-colors duration-300 transform rounded-md text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 hover:text-neutral-700" onClick={() => router.push('/publics/mypage')}>
      <RiUser3Line className="w-7 h-7" />
      <h4 className="font-bold mx-7">마이페이지</h4>
    </a>

  </nav>
</div>
</aside>
</div>
);
};