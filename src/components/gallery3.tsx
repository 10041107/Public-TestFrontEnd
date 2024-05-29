import IndexCardItem from '@/components/microblog/IndexCardItem';
import IndexCardPanel from '@/components/microblog/IndexCardPanel';
import React, { useState, useEffect } from 'react';
import AnimatedContainer from './motiondiv/AnimatedContainer';
import { RandomCenterleft, RandomGrey, RandomCenterRight, RandomLeft, RandomRight } from '../components/randomimagesrc';
import { fetchUserProfile } from '../services/api';
import { useRouter } from 'next/router';

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

export const Gall: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    fetchUser();
  }, [router]);

  
  const navigateToProfile = () => {
    router.push('/publics/mypage');
  };

  const navigateToCommunity = () => {
    router.push('/community');
  };

  const navigateToUpdateProfile = () => {
    router.push('/publics/update-profile');
  };



  const RandomImageComponent = user?.position === 'grey' ? RandomGrey :
    user?.position === 'centerleft' ? RandomCenterleft :
    user?.position === 'left' ? RandomLeft :
    user?.position === 'centerright' ? RandomCenterRight :
    user?.position === 'right' ? RandomRight : RandomGrey;

  const PositionDescription = user?.position === 'grey' ? "중용을 지향하는 조화로운 발전가" :
    user?.position === 'centerleft' ? "중용을 지향하는 조화로운 발전가" :
    user?.position === 'left' ? "혁신을 추구하는 열정적인 비전가" :
    user?.position === 'centerright' ? "현실과 전통의 조화를 추구하는 계획자" :
    user?.position === 'right' ? "전통을 소중히 여기는 확고한 신념의 수호자" : "지금 테스트해보세요!";

  return (
    <>
      <style jsx>{`
        @media (max-width: 640px) {
          .container {
            max-width: 550px;
            width: 100%;
          }
        }
      `}</style>
      <section className="text-white hover:text-white body-font">
        <div className="container flex flex-col flex-wrap items-center justify-center w-full py-2 mx-auto px-7 sm:w-full md:w-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl force-mobile-width">
          <div className="flex flex-wrap w-full">
            <div className="w-full p-3 md:p-3 md:w-1/2 parent">
              <h3 className="font-bold text-neutral-500">마이페이지</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '195px' }} onClick={navigateToProfile}>
                <RandomImageComponent>
                  {(src: string) => (
                    <img
                      alt="Random Gallery Image"
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                      src={src}
                    />
                  )}
                </RandomImageComponent>
                <div className="overlay-gif"></div>
                <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                  <div className="always-visible">
                    <h3 className="mb-1 tracking-widest text-white hover:text-white title-font">환영합니다</h3>
                    <h3 className="mb-1 font-bold text-white hover:text-white title-font bold">사용자 님!</h3>
                  </div>
                  <div className="transition-opacity ease-in-out opacity-0 duration-400 hover-visible hover:opacity-100">
                    <p className="leading-relaxed text-neutral-100">마이페이지로 이동하기</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 md:p-3 md:w-1/2 parent">
              <h3 className="font-bold text-neutral-500">오늘의 정치 뉴스</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '195px' }} onClick={navigateToCommunity}>
                <RandomImageComponent>
                  {(src: string) => (
                    <img
                      alt="Random Gallery Image"
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                      src={src}
                    />
                  )}
                </RandomImageComponent>
                <div className="overlay-gif"></div>
                <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                  <div className="always-visible">
                    <h3 className="mb-1 tracking-widest text-white hover:text-white title-font">오늘의 정치,</h3>
                    <h3 className="mb-1 font-bold text-white hover:text-white title-font bold">어떻게 생각하시나요?</h3>
                  </div>
                  <div className="transition-opacity ease-in-out opacity-0 duration-400 hover-visible hover:opacity-100">
                    <p className="leading-relaxed text-neutral-100">커뮤니티로 이동하기</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 md:p-3 parent">
              <h3 className="font-bold text-neutral-500">오늘의 추천 정치인</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400" style={{ height: '195px' }}>
                <IndexCardPanel >
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1715304564655-38720cdf88f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1647892272954-5f4db0cb0d46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1650961634510-eb8d9203d6e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1541726260-e6b6a6a08b27?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1597704097219-0f6a59def63d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'중도우파'} />
                  <IndexCardItem name={'문재인'} username={'더불어민주당'} src={'https://images.unsplash.com/photo-1576568684781-f409ebf87cc3?q=80&w=1269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} initials={'좌파'} />
                </IndexCardPanel>
              </div>
            </div>
            <div className="w-full p-3 md:p-3 md:w-1/2 parent">
              <h3 className="font-bold text-neutral-500">이전 테스트 결과</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '195px' }}  onClick={navigateToCommunity}>
                <RandomImageComponent>
                  {(src: string) => (
                    <img
                      alt="Random Gallery Image"
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                      src={src}
                    />
                  )}
                </RandomImageComponent>
                <div className="overlay-gif"></div>
                <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                  <div className="always-visible">
                    <h3 className="mb-1 tracking-widest text-white hover:text-white title-font">나의 정치성향</h3>
                    <h3 className="mb-1 text-base font-bold text-white hover:text-white title-font bold lg:text-xl xl:text-2xl 2xl:text-2xl">&quot; {PositionDescription} &quot;</h3>

                  </div>
                  <div className="transition-opacity ease-in-out opacity-0 duration-400 hover-visible hover:opacity-100">
                    <p className="leading-relaxed text-neutral-100">성향 해석 페이지로 이동하기</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 md:p-3 md:w-1/2 parent">
              <h3 className="font-bold text-neutral-500">정치인 세부정보 확인</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '195px' }}  onClick={navigateToCommunity}>
                <RandomImageComponent>
                  {(src: string) => (
                    <img
                      alt="Random Gallery Image"
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                      src={src}
                    />
                  )}
                </RandomImageComponent>
                <div className="overlay-gif"></div>
                <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                  <div className="always-visible">
                    <h3 className="mb-1 tracking-widest text-white hover:text-white title-font">나와 맞는 정치인,</h3>
                    <h3 className="mb-1 font-bold text-white hover:text-white title-font bold">어떤 사람이 있을까요?</h3>
                  </div>
                  <div className="transition-opacity ease-in-out opacity-0 duration-400 hover-visible hover:opacity-100">
                    <p className="leading-relaxed text-neutral-100">정치인 세부정보로 이동하기</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-3 md:p-3 parent">
              <div className="relative flex overflow-hidden transition-opacity ease-in-out shadow-lg duration-400 rounded-xl" style={{ height: '195px' }}  onClick={navigateToCommunity}>
                <RandomGrey>
                  {(src: string) => (
                    <img
                      alt="Random Gallery Image"
                      className="absolute inset-0 object-cover object-center w-full h-full rounded-xl"
                      src={src}
                    />
                  )}
                </RandomGrey>
                <div className="overlay-gif"></div>
                <div className="relative w-full px-10 py-10 text-center text-white transition-opacity ease-in-out border-4 hover:text-white bg-neutral-400 duration-400 bg-opacity-5 hover:bg-opacity-70 rounded-xl">
                  <div className="always-visible">
                    <h3 className="mb-1 tracking-widest text-white hover:text-white title-font">나는 어느쪽일까?</h3>
                    <h3 className="mb-1 font-bold text-white hover:text-white title-font bold">정치 성향 테스트 하러 가기</h3>
                  </div>
                  <div className="transition-opacity ease-in-out opacity-0 duration-400 hover-visible hover:opacity-100">
                    <p className="leading-relaxed text-neutral-100">테스트 페이지로 이동하기</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Gallery3() {
  return (
    <div>
      <AnimatedContainer type="fadeInSlow">
        <Gall />
      </AnimatedContainer>
    </div>
  );
}
