import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavigationToggleButtonProps {
  isOpen: boolean;
  toggle: () => void; 
}

const NavigationToggleButton: React.FC<NavigationToggleButtonProps> = ({ isOpen, toggle }) => {

  const buttonStyle: React.CSSProperties = { 
    position: 'fixed',
    top: '50%',
    left: isOpen ? 'calc(2% + 300px)' : '2%',
    transform: 'translate(-50%, -50%)',
    zIndex: 100
  };

  return (    
    <div style={buttonStyle} onClick={toggle}>
        <button className="px-6 py-4 text-lg text-black">
            {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </button>
    </div>
  );
};

export default NavigationToggleButton;
