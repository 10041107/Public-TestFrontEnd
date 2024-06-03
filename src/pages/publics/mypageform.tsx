import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserProfile } from '../../services/api';
import Logoutbutton from './logout';
import { CldImage } from 'next-cloudinary';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
  profileImage: string;
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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="py-6 mx-5 sm:py-4 lg:py-8">
      <div className="px-4 mx-auto max-w-screen-2xl md:px-3">
        <div className="flex flex-col items-center justify-center max-w-lg p-4 mx-auto border rounded-lg shadow-lg md:p-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex items-center justify-center mb-4">
              <CldImage
                width="150"
                height="150"
                src={user?.profileImage || "etrgioj5gixnspvbmaxs"}
                alt="Profile Image"
                className="border rounded-full shadow-lg "
              />
            </div>
            <p className="m-1 mt-4 font-semibold text-mx text-neutral-500">{user.userName}</p>
            <p className="m-1 text-sm font-semibold text-neutral-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
