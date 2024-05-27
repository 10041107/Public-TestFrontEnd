import { useRouter } from 'next/router';
import React from 'react';
import AnimatedContainer from '../components/motiondiv/AnimatedContainer';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../components/navigation";
import NavigationToggleButton from '@/components/NavigationToggleButton';


const Custom404: React.FC = (): JSX.Element => {

    const [isOpen, setIsOpen] =  useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    
  const router = useRouter();
  return (
    <div className="h-screen overflow-y-scroll lg:overflow-y-hidden lg:hide-scrollbar">
        <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
              style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 120 }}
            >
              <DrawerNavigation />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 110,
                pointerEvents: 'auto', // 클릭 이벤트를 허용하도록 설정
              }}
              onClick={toggleOpen} // 클릭 시 사이드바를 닫도록 설정
            />
          </>
        )}
      </AnimatePresence>
      <NavigationToggleButton isOpen={isOpen} toggle={toggleOpen} />
        
    <section>
        <div className="container flex items-center min-h-screen py-12 mx-auto px-30">
                <AnimatedContainer type="fadeIn">
                <AnimatedContainer type="Vibration">
            <div className="flex flex-col items-center mx-auto text-center">
                <p className="p-3 text-sm font-medium text-gray-400 rounded-full bg-blue-50 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </p>
                <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">원하시는 페이지를 찾을 수 없습니다.</h1>
                <p className="mt-4 text-gray-500 dark:text-gray-400">입력하신 페이지의 주소가 명확한지 다시 한 번 확인해주세요.</p>

                <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                    <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={() => router.back()}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>돌아가기</span>
                    </button>

                    <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-gray-500 rounded-lg shrink-0 sm:w-auto hover:bg-gray-400 dark:hover:bg-blue-500 dark:bg-blue-600" onClick={() => router.push('/')}>
                        홈으로 가기
                    </button>
                </div>
            </div>
            </AnimatedContainer>
        </AnimatedContainer>
        </div>
    </section>
    </div>
  );
};

export default Custom404;
