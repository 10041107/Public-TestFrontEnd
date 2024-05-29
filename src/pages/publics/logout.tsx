import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { logoutUser } from '../../services/api';

const LogoutButton: React.FC<{ className: string }> = ({ className }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token'); // 액세스 토큰 제거
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button 
      className={className} 
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
