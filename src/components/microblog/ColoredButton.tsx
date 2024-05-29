// ColoredButton.js 또는 ColoredButton.tsx 파일
import React from 'react';

interface ColoredButtonProps {
  initials: string;
  children: React.ReactNode; 
}

const ColoredButton: React.FC<ColoredButtonProps> = ({ initials, children }) => {
  const bgColorClass = (initials: string) => {
    switch (initials) {
      case '우파':
        return 'bg-rose-600';
      case '중도우파':
        return 'bg-red-300';
      case '중도좌파':
        return 'bg-cyan-400';
      case '좌파':
        return 'bg-blue-600';
      default:
        return 'bg-gray-300'; 
    }
  };

  return (
    <button className={`text-[13px] font-medium text-white rounded-xl px-3 ${bgColorClass(initials)}`}>
      {children}
    </button>
  );
};

export default ColoredButton;
