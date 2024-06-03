import axios from 'axios';
import CardItem from '@/components/microblog/CardItem';
import CardPanel from '@/components/microblog/CardPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DrawerNavigation } from "../components/navigation";
import NavigationToggleButton from '../components/navigationbutton';
import AnimatedContainer from '../components/motiondiv/AnimatedContainer';
import Header from '../components/microblog/Header';
import Nav from '../components/microblog/Nav';
import Panel from '../components/microblog/Panel';
import PanelItem from '../components/microblog/PanelItem';
import PanelItemTrends from '../components/microblog/PanelItemTrends';
import Search from '../components/microblog/Search';
import Tabs from '../components/microblog/radix/Tabs';
import { useRouter } from 'next/router';
import { fetchUserProfile } from '../services/api';

interface Politician {
  committee: string;
  id: number;
  name: string;
  description: string;
  code: string;
  party: string;
  profileImage: string;
}

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
  profileImage: string;
  position: string;
}


const Community = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      // Token이 없을 경우 기본값으로 설정
      if (!token) {
        setUser(null); // 또는 기본 사용자 정보를 설정
        return;
      }

      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message || 'Unknown error');
        setUser(null); // 오류가 발생해도 기본 사용자 정보를 설정
      }
    };

    const fetchPoliticians = async () => {
      try {
        const response = await axios.get('http://localhost:8080/politician/getTodaysPolitician');
        setPoliticians(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching politicians:', error);
      }
    };

    fetchUser();
    fetchPoliticians();
  }, [router]);

  const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
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

            <AnimatedContainer type="fadeInSlow">

            <div className="flex min-h-screen gap-3 m-6 mx-auto max-w-8xl">
                    <main className="flex-col col-span-4 mx-auto w-[500px] md:w-[600px] 2xl:w-[900px]">
                        <Header title="Home"/>
                        <CardPanel name="오늘의 정치인 추천" href="/more">
                        {politicians.map(politician => (
                          <CardItem
                            key={politician.id}
                            name={politician.name}
                            username={politician.party}
                            src={`/politician_image/${politician.code}.jpg`}
                            initials={politician.committee}
                          />
                        ))}
                      </CardPanel>
                    <Tabs />
                    <Nav />
                </main>
                <aside className="h-100% flex-col hidden col-span-4 lg:flex w-[300px] xl:w-[400px] 2xl:w-[500px]">
                    <div className="hide-scrollbar" style={{ height: '100%', overflowY: 'scroll' }}>
                    <div className="sticky top-0 ">
                        <Search />
                        <Panel title="오늘의 정치 키워드" href="/">
                            <PanelItemTrends
                                title="정치일반"
                                category="사회"
                                stat="57.5K"
                            />
                            <PanelItemTrends 
                                title="국회정당" 
                                category="인문" 
                                stat="107.5K" 
                            />
                            <PanelItemTrends
                                title="외교"
                                category="경제"
                                stat="127.5K"
                            />
                            <PanelItemTrends
                                title="경제정책"
                                category="복지"
                                stat="87.5K"
                            />
                            <PanelItemTrends
                                title="IT・과학"
                                category="과학"
                                stat="27.5K"
                            />
                        </Panel>
                        <Panel title="오늘의 정치인" href="/">
                            <PanelItem
                                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                                name="문재인"
                                username="더불어민주당"
                                initials="좌파"
                            />
                            <PanelItem
                                src="https://images.unsplash.com/photo-1613951085587-cfe5d0a6cffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                                name="홍준표"
                                username="국민의힘"
                                initials="우파"
                            />
                            <PanelItem
                                src="https://images.unsplash.com/photo-1614777735430-7b46df56b404?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3OTAyNDY1Mnx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                name="이낙연"
                                username="더불어민주당"
                                initials="중도우파"
                            />
                        </Panel>
                    </div>
                    </div>
                </aside>
            </div>
        </AnimatedContainer>
        </div>
    );
}

export default Community;