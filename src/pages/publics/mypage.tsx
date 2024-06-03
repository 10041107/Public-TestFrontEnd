import { Verified } from "lucide-react";
import { RandomCenterleft, RandomGrey, RandomCenterRight, RandomLeft, RandomRight } from '../../components/randomimagesrc';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../components/navigation";
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { useState, useEffect } from 'react';
import Mypage from "./mypageform";
import { fetchUserProfile } from '../../services/api';
import { useRouter } from 'next/router';
import Logoutbutton from "./logout";

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
  profileImage: string;
  position: string;
}

const Mypages: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);


  const navigateToProfile = () => {
    router.push('/publics/mypage');
  };

  const navigateToChangePassword = () => {
    router.push('/publics/change-password');
  };

  const navigateToUpdateProfile = () => {
    router.push('/publics/update-profile');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message || 'Unknown error');
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const RandomImageComponent = user?.position === 'grey' ? RandomGrey :
  user?.position === 'centerleft' ? RandomCenterleft :
  user?.position === 'left' ? RandomLeft :
  user?.position === 'centerright' ? RandomCenterRight :
  user?.position === 'right' ? RandomRight : RandomGrey;

  return (
    <div className="flex w-screen h-screen min-h-screen">
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
                pointerEvents: 'auto', 
              }}
              onClick={toggleOpen} 
            />
          </>
        )}
      </AnimatePresence>
      <NavigationToggleButton isOpen={isOpen} toggle={toggleOpen} />
      {/* 사이드바 종료 */}
      <div className="flex w-full h-full">
        <div className="relative hidden h-full lg:block lg:w-1/2">
          <RandomImageComponent>
            {(src: string) => (
              <img
                alt="Random Gallery Image"
                className="absolute inset-0 object-cover object-center w-full h-full"
                src={src}
              />
            )}
          </RandomImageComponent>
          <img src="/free-icon-agreement-3375267.png" className="absolute w-14 h-14 top-5 left-5" alt="logo" />
          <div className="absolute inline-flex items-center gap-1 px-3 py-2 font-semibold text-white border-2 border-white rounded-lg left-5 bottom-5">
            <Verified width={18} height={18} />
            마이페이지
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full lg:w-1/2">
          <div className=" text-neutral-800">
          <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '170px' }} onClick={navigateToProfile}>
                    <RandomImageComponent>
                        {(src: string) => (
                            <img
                                alt="Random Gallery Image"
                                className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                                src={src}
                            />
                        )}
                    </RandomImageComponent>
                    <div className="overlay-gif"></div>
                    <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                        <div className="always-visible">
                            <h2 className="mb-1 tracking-widest text-white hover:text-white title-font">반갑습니다!</h2>
                            <h4 className="mb-1 font-bold text-white hover:text-white title-font bold">{user?.userName} 님의 마이페이지</h4>
                        </div>
                    </div>
                </div>
            <Mypage />
            <div>
            <div className="flex flex-wrap justify-center gap-2">
      <div className="flex flex-col gap-2">
        <button 
          className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
          onClick={navigateToProfile}
        >
          상세 프로필 조회하기
        </button>
        <button 
          className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
          onClick={navigateToChangePassword}
        >
          비밀번호 변경하기
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
          onClick={navigateToUpdateProfile}
        >
         프로필 업데이트
        </button>
        <Logoutbutton 
        className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" />
      </div>
    </div>
    <hr className="h-1 my-1 border-0 bg-neutral-200" />



            </div>
            </div>
        </div>
      </div>

    </div>
  );
};



export default Mypages;

