import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { changePassword, fetchUserProfile } from '../services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../components/navigation";
import NavigationToggleButton from '@/components/NavigationToggleButton';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  const [isOpen, setIsOpen] =  useState(false);

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
        console.error('Error fetching user profile:', error);
        setError(error.message);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await changePassword(currentPassword, newPassword);
      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다.');
        router.push('/profile');
      } else {
        setError('비밀번호 변경에 실패했습니다.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (

    <div className="flex w-screen h-screen min-h-screen bg-white">
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
      <h1>Change Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleChangePassword}>
        <div>
          <label htmlFor="currentPassword">현재 비밀번호:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}


