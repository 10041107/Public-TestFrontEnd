
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DrawerNavigation } from "../components/navigation";
import AnimatedContainer from '../components/motiondiv/AnimatedContainer';
import { Button } from "antd";
import React from 'react';
import { useRouter } from 'next/router';
import { CldImage } from 'next-cloudinary';

import Gallery3 from '../components/gallery3';

const MainPage: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
       <div className="container flex flex-col flex-wrap items-center justify-center w-full py-2 mx-auto px-7 sm:w-full md:w-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl force-mobile-width">
                    
      <div>
        <CldImage
          width="150"
          height="150"
          src="mfgk0lhtvvqqxpckqtbz"
          alt="Description of my image"
        />

      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
      <Button onClick={navigateToLogin}>Login</Button>
    </div>
    </div>
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






