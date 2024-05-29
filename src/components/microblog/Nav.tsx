import Panel from './Panel';
import PanelItem from './PanelItem';



const Nav = () => (
                <main className="w-full col-span-7 my-3 border-gray-200 rounded-lg">
                        <Panel title="정치인 추천" href="/">
                            <PanelItem
                                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8Mjd8NzkwMjQ2NTJ8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
                                name="문재인"
                                username="더불어민주당"
                                initials="중도좌파"
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
                                initials="중도좌파"
                            />
                        </Panel>
                        </main>
);

export default Nav;
