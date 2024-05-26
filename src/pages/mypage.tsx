import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserProfile } from '../services/api';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
}

export default function Profile() {
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
    <div>
      <h1>Profile Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Username: {user.userName}</p>
      <p>Email: {user.email}</p>
      <p>Nickname: {user.nickname}</p>
      <p>Gender: {user.gender}</p>
      <p>Age Group: {user.ageGroup}</p>
      <p>Region: {user.region}</p>
    </div>
  );
}


// import { useDashboard } from "@/client/sample/dashboard";
// import NavigationToggleButton from '@/components/NavigationToggleButton';
// import StatisticSample from "@/components/page/index/statistic-sample";
// import { useAuth } from "@/lib/auth/auth-provider";
// import { Alert, Skeleton } from "antd";
// import { AnimatePresence, motion } from 'framer-motion';
// import { useState } from 'react';
// import Gallery3 from '../components/gallery3';
// import { DrawerNavigation } from "../components/navigation";
// import AnimatedContainer from '../components/motiondiv/AnimatedContainer';


// export function Layout() {
//   return (
//     <motion.div
//     initial={{ opacity: 0, y: -30 }}
//     animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
//     className="flex flex-col items-center justify-center flex-grow w-full gap-10 mb-28"
//   > 

//   </motion.div>
//   );
// }



// const IndexPage = () => {
//   const { session } = useAuth();
//   const { data, error } = useDashboard();

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleOpen = () => setIsOpen(!isOpen);

//   return (
//     <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
//               style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 120 }} 
//             >
//               <DrawerNavigation />  
//             </motion.div> 
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0, transition: { duration: 0.3 } }}
//                 style={{
//                   position: 'fixed',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   backgroundColor: 'rgba(255, 255, 255, 0.7)', 
//                   zIndex: 110, 
//                   pointerEvents: 'none', 
//                 }}
//               />
//             </>
//           )}
//         </AnimatePresence>
//       <NavigationToggleButton isOpen={isOpen} toggle={toggleOpen} /> 
//       {/* 사이드바 종료 */}

//             <AnimatedContainer type="fadeInSlow">
//               <div className="my-5">
//                 <h2 className="title">👋 {session.user.name || "사용자"}님의 마이페이지</h2>

//                 <div className="my-5">
//                   {data ? (
//                     <StatisticSample data={data} />
//                   ) : error ? (
//                     <Alert message="웹 호출 중 오류가 발생했습니다." type="warning" />
//                   ) : (
//                     <Skeleton />
//                   )}
//                 <Gallery3/>
//               </div>
//             </div>
//             </AnimatedContainer>
//       </div>
//   );
// };


// export default IndexPage;