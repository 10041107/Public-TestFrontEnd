import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface NavigationToggleButtonProps {
  isOpen: boolean;
  toggle: () => void;
}

const NavigationToggleButton: React.FC<NavigationToggleButtonProps> = ({ isOpen, toggle }) => {
  // 버튼 색상 상태를 관리하기 위한 useState 훅 사용
  const [buttonColor, setButtonColor] = useState('grey');
// 버튼 아이콘의 색상을 나타냅니다.

const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: isOpen ? 'calc(2% + 300px)' : '2%',
  transform: 'translate(-50%, -50%)',
  zIndex: 100,
  color: buttonColor, // 버튼의 텍스트 혹은 아이콘 색상을 버튼 아이콘 색상으로 설정합니다.
};

  // 버튼 클릭 시 이벤트 핸들러
  const handleClick = () => {
    toggle();  // 기존 토글 기능 수행
    setButtonColor(buttonColor === 'grey' ? 'black' : 'grey'); 
  };

  return (    
    <div style={buttonStyle} onClick={handleClick}>
      <button className="px-6 py-4 text-xl">
          {isOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </button>
    </div>
  );
};

export default NavigationToggleButton;
