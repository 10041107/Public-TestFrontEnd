
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DrawerNavigation } from "../components/navigation";
import AnimatedContainer from '../components/motiondiv/AnimatedContainer';
import React from 'react';
import { useRouter } from 'next/router';

import Gallery3 from '../components/gallery3';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
}

const MainPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>

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

              <AnimatedContainer type="fadeInSlow">
              <Gallery3/>
              </AnimatedContainer>
    </div>
  );

};

export default MainPage;






