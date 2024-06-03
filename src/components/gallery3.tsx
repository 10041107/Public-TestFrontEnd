import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IndexCardItem from '@/components/microblog/IndexCardItem';
import IndexCardPanel from '@/components/microblog/IndexCardPanel';
import AnimatedContainer from './motiondiv/AnimatedContainer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { RandomCenterleft, RandomGrey, RandomCenterRight, RandomLeft, RandomRight } from '../components/randomimagesrc';
import { fetchUserProfile } from '../services/api';



interface Politician {
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

export const Gall: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [politicians, setPoliticians] = useState<Politician[]>([]);


  

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
        setPoliticians(response.data);
      } catch (error) {
        console.error('Error fetching politicians:', error);
      }
    };

    fetchUser();
    fetchPoliticians();
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

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    

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
  
            {/* 최상단 타이틀 부분 */}
            <div className="w-full p-3 text-center mt-7 ">
              <img src="/logo.png" alt="Logo" className="mx-auto mb-4 " style={{ width: '100px' }} /> {/* 로고 이미지 추가 */}
              <h2 className="mb-1 text-2xl font-bold xl:text-3xl text-neutral-500">스마트한 정치 정보 전달 플랫폼</h2>
              <h3 className="mb-1 text-sm font-bold xl:text-base text-neutral-400">당신과 맞는 정치인을 찾아보세요</h3>
            </div>
            

            {/* 이미지 슬라이더 부분 */}
            <div className="w-10/12 p-3 mb-10 ">
              <Slider {...sliderSettings}>
                <div>
                  <img src="/introimage.png" alt="Intro Image 1" className="w-full border-2 shadow-lg rounded-xl" />
                </div>
                <div>
                  <img src="/introimage.png" alt="Intro Image 2" className="w-full border-2 shadow-lg rounded-xl" />
                </div>
                <div>
                  <img src="/introimage.png" alt="Intro Image 3" className="w-full border-2 shadow-lg rounded-xl" />
                </div>
              </Slider>
              <hr className="w-1/3 h-1 my-1 mt-2 border-0 bg-neutral-200" />
              <h3 className="font-bold text-neutral-500">2021-05-03 ~ 2024-05-13</h3>
              <h4 className="text-sm text-neutral-500 text-semibold">어떤 법안이 가장 많았을까요?</h4>
              <p className="text-xs text-neutral-400">발의 된 법안에서 사용된 단어의 빈도 수 : 워드클라우드</p>

            </div>
          <div className="flex flex-wrap w-full my-5">
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
            <div className="w-full p-3 md:p-3 md:w-1/2 parent ">
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
            <div className="w-full p-3 my-5 md:p-3 parent">
              <h3 className="font-bold text-neutral-500">오늘의 추천 정치인</h3>
              <hr className="h-1 my-1 bg-neutral-200 " />
                <IndexCardPanel>
                  {politicians.map(politician => (
                    <IndexCardItem
                      key={politician.id}
                      name={politician.name}
                      username={politician.party}
                      src={`/politician_image/${politician.code}.jpg`}
                      initials={politician.committee}
                    />
                  ))}
                </IndexCardPanel>
            </div>
            <div className="w-full p-3 md:p-3 md:w-1/2 parent ">
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
            <div className="w-full p-3 my-5 md:p-3 parent">
              <h3 className="font-bold text-neutral-500">정치 테스트 하러 가기</h3>
              <hr className="h-1 my-1 border-0 bg-neutral-200" />
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
                    <h3 className="mb-1 font-bold text-white hover:text-white title-font bold">궁금하다면 여기서 테스트해보세요!</h3>
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
