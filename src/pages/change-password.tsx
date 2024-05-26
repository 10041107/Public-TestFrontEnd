import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { changePassword, fetchUserProfile } from '../services/api';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

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
    <div>
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


