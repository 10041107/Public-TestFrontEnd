
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DrawerNavigation } from "../components/navigation";
import AnimatedContainer from '../components/motiondiv/AnimatedContainer';
import { Button } from "antd";
import React from 'react';
import { useRouter } from 'next/router';
import LogoutButton from './logout';
import { CldImage } from 'next-cloudinary';

import Gallery3 from '../components/gallery3';

const MainPage: React.FC = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToTerms = () => {
    router.push('/terms');
  };
  
  const navigateToProfile = () => {
    router.push('/profile');
  };

  const navigateToChangePassword = () => {
    router.push('/change-password');
  };

  const navigateToUpdateProfile = () => {
    router.push('/update-profile');
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
      <div>
        <CldImage
          width="150"
          height="150"
          src="mfgk0lhtvvqqxpckqtbz"
          alt="Description of my image"
        />

      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
      <Button onClick={navigateToTerms}>Register</Button>
      <Button onClick={navigateToLogin}>Login</Button>
      <LogoutButton />
      <Button onClick={navigateToProfile}>Profile</Button>
      <Button onClick={navigateToChangePassword}>Change Password</Button>
      <Button onClick={navigateToUpdateProfile}>Update Profile</Button>
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
                  pointerEvents: 'none', 
                }}
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
