import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { changePassword, fetchUserProfile } from '../../services/api';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../components/navigation";
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { Alert } from 'antd';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

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
        setLoading(true); // Start loading
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        router.push('/login');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUser();
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true); // Start loading
      const response = await changePassword(currentPassword, newPassword);
      if (response.status === 200) {
        alert('비밀번호가 변경되었습니다.');
        router.push('/publics/profile');
      } else {
        setError('비밀번호 변경에 실패했습니다.');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      } else {
        setError(error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  if (!user || loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen py-6 bg-center bg-no-repeat bg-summonersRift sm:py-8 lg:py-12">
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

      <div className="text-center">
        <h1 className="mb-5 text-4xl font-bold text-neutral-700">비밀번호 변경</h1>
      </div>
      {error && <Alert message={error} type="error" className="max-w-screen-md mx-auto mb-5 text-sm text-red-700 " />}
      <form className="grid max-w-screen-md gap-4 mx-auto sm:grid-cols-2" onSubmit={handleChangePassword}>
        <div className="sm:col-span-2">
          <label htmlFor="currentPassword" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">현재 비밀번호</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="newPassword" className="inline-block mb-2 text-sm text-gray-800 sm:text-base text-neutral-700">새 비밀번호</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="w-full px-3 py-2 text-gray-800 transition duration-100 border rounded outline-none bg-gray-50 ring-indigo-300 focus:ring"
          />
        </div>
        <div className="flex justify-center sm:col-span-2">
          <button type="submit" disabled={loading} className="w-full max-w-xs px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-500 ring-neutral-300 hover:bg-neutral-400 focus-visible:ring active:bg-neutral-600 md:text-base">
            {loading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </div>
      </form>
    </div>
  );
}
