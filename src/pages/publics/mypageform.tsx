import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserProfile } from '../../services/api';
import Logoutbutton from './logout';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
}

export default function Mypage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        setError(error.response?.data?.message || error.message || 'Unknown error');
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);
  
  const navigateToProfile = () => {
    router.push('/publics/profile');
  };

  const navigateToChangePassword = () => {
    router.push('/publics/change-password');
  };

  const navigateToUpdateProfile = () => {
    router.push('/publics/update-profile');
  };


  if (!user) return <div>Loading...</div>;

  return (
    <div className="py-6 sm:py-8 lg:py-12">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
        <div className="max-w-lg p-4 mx-auto border rounded-lg md:p-8">
          <div className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <h1 className="mb-6 text-2xl font-bold text-center">Profile Page</h1>
            <p className="text-sm text-neutral-800 sm:text-base">Username: {user.userName}</p>
            <p className="text-sm text-neutral-800 sm:text-base">Email: {user.email}</p>
            <p className="text-sm text-neutral-800 sm:text-base">Nickname: {user.nickname}</p>
            <p className="text-sm text-neutral-800 sm:text-base">Gender: {user.gender}</p>
            <p className="text-sm text-neutral-800 sm:text-base">Age Group: {user.ageGroup}</p>
            <p className="text-sm text-neutral-800 sm:text-base">Region: {user.region}</p>
            <button 
              className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
              onClick={navigateToProfile}
            >
              Profile
            </button>
            <button 
              className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
              onClick={navigateToChangePassword}
            >
              Change Password
            </button>
            <button 
              className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" 
              onClick={navigateToUpdateProfile}
            >
              Update Profile
            </button>
            <Logoutbutton className="block px-8 py-3 text-sm font-semibold text-center text-white transition duration-100 rounded-lg outline-none bg-neutral-700 ring-neutral-300 hover:bg-neutral-600 focus-visible:ring active:bg-neutral-600 md:text-base" />
          </div>
        </div>
      </div>
    </div>
  );
}  