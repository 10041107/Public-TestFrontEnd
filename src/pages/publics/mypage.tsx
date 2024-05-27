import { Verified } from "lucide-react";
import { RandomGrey } from '../../components/randomimagesrc';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../components/navigation";
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { useState, useEffect } from 'react';
import Mypage from "./mypageform";
import { fetchUserProfile } from '../../services/api';
import { useRouter } from 'next/router';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
}

const Mypages = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

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
                pointerEvents: 'auto', // 클릭 이벤트를 허용하도록 설정
              }}
              onClick={toggleOpen} // 클릭 시 사이드바를 닫도록 설정
            />
          </>
        )}
      </AnimatePresence>
      <NavigationToggleButton isOpen={isOpen} toggle={toggleOpen} />
      {/* 사이드바 종료 */}
      <div className="flex w-full h-full">
        <div className="relative hidden h-full lg:block lg:w-1/2">
          <RandomGrey>
            {(src: string) => (
              <img
                alt="Random Gallery Image"
              className="absolute inset-0 object-cover object-center w-full h-full"
                src={src}
              />
            )}
          </RandomGrey>
          <img src="/free-icon-agreement-3375267.png" className="absolute w-14 h-14 top-5 left-5" alt="logo" />
          <div className="absolute inline-flex items-center gap-1 px-3 py-2 font-semibold text-white border-2 border-white rounded-lg left-5 bottom-5">
            <Verified width={18} height={18} />
            마이페이지
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full lg:w-1/2">
          <div className="w-full max-w-md px-5 pb-10 text-neutral-800">
            <div className="flex flex-col items-center justify-center px-2 mt-8 sm:mt-0">
              <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-700">반갑습니다!</h2>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-neutral-700">{user?.userName} 님</h2>
            </div>
            <Mypage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypages;
