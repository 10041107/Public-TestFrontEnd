import CardItem from '@/components/microblog/CardItem';
import CardPanel from '@/components/microblog/CardPanel';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
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



const Community = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                    pointerEvents: 'none', 
                    }}
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

                        <CardPanel name="오늘의 추천 정치인" href="/more">
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1715304564655-38720cdf88f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1647892272954-5f4db0cb0d46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1650961634510-eb8d9203d6e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1597704097219-0f6a59def63d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'}/>
                            <CardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'}/>
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