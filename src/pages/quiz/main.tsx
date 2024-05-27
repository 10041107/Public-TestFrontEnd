import { useState } from 'react';
import Introduce from "../../components/introduce";
import MetaData from "../../components/meta/MetaData";

import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../components/navigation";

const Main = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen); 
	
	return (
		<>
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
			
			<div className="flex flex-col items-center justify-center w-screen h-screen bg-center bg-no-repeat bg-summonersRift" role="img">
				<MetaData title={undefined} description={undefined} />
				<Introduce />
			</div>
		</>
	);
};

export default Main;
