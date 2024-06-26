import { RiDownload2Line, RiHome2Line } from "@remixicon/react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from "react";
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../../../components/navigation";
import { submitQuizAnswers } from "../../../../services/api";
import IndexCardItem from "../../../../components/IndexCardItem"; // IndexCardItem 컴포넌트 가져오기

const resultImages: { [key: string]: string } = {
  left: '/result-images/left.png',
  centerLeft: '/result-images/centerLeft.png',
  centerRight: '/result-images/centerRight.png',
  right: '/result-images/rightR.png',
};

const ResultPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen); 

  const router = useRouter();
  const [resultImage, setResultImage] = useState('');
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    if (router.isReady) {
      console.log('Result category from router:', router.query);
      fetchResultData(router.query);
    }
  }, [router.isReady, router.query]);

  const fetchResultData = async (query: any) => {
    try {
      const data = await submitQuizAnswers(query);
      console.log('Received data:', data); // 콘솔에 데이터 출력
      setResultData(data);

      const score = data.totalScore;
      let category;
      if (score <= 30) category = 'left';
      else if (score <= 50) category = 'centerLeft';
      else if (score <= 69) category = 'centerRight';
      else category = 'right';

      setResultImage(resultImages[category]);
    } catch (error) {
      console.error('Error fetching result data:', error);
    }
  };

  const getMessage = (result: 'left' | 'centerLeft' | 'centerRight' | 'right'): string => {
    switch (result) {
      case 'right':
        return `" 전통을 소중히 여기는 확고한 신념의 수호자 "`;
      case 'centerRight':
        return `" 현실과 전통의 조화를 추구하는 계획자 "`;
      case 'centerLeft':
        return `" 중용을 지향하는 조화로운 발전가 "`;
      case 'left':
        return `" 혁신을 추구하는 열정적인 비전가 "`;
      default:
        return `결과를 찾을 수 없습니다.`;
    }
  };

  const handleDownloadImage = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = `result.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      window.alert('URL이 클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleResetTest = () => {
    router.push("/test");
  };

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
      <Fragment>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              className="flex flex-col items-center justify-center flex-grow w-full gap-5 mb-28"
            >
              {/* 네비게이션 바: 홈 아이콘 제공 */}
              <nav className="w-full py-3">
                <ul className="flex justify-end text-stone-400">
                  <li onClick={() => router.push('/')} className="cursor-pointer">
                    <RiHome2Line />
                  </li>
                </ul>
              </nav>

              <h1 className="text-4xl font-bold text-slate-800">당신의 정치적 성향은?</h1>
              {resultData && (
                <h4 className="text-xl text-slate-400">{getMessage(resultData.totalScore <= 30 ? 'left' : resultData.totalScore <= 50 ? 'centerLeft' : resultData.totalScore <= 69 ? 'centerRight' : 'right')}</h4>
              )}
              <hr className="h-1 my-1 border-0 bg-stone-400"/>

              {resultImage && (
                <Image src={resultImage} alt="Result Image" width={700} height={500} />
              )}
              
              {resultData && (
                <div className="mt-4 text-xl text-slate-600">
                  <h2>Security Score: {resultData.securityScore}</h2>
                  <h2>Society Score: {resultData.societyScore}</h2>
                  <h2>Economy Score: {resultData.economyScore}</h2>
                  <h2>Legal Score: {resultData.legalScore}</h2>
                  <h2>Total Score: {resultData.totalScore}</h2>
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                className="flex flex-col items-center justify-center flex-grow w-full gap-0 mb-28"
              >
                <div className="flex items-center justify-center flex-grow w-full mt-1">
                  
                  {/* 테스트를 다시 시작하는 버튼 */}
                  <button onClick={handleResetTest} className="p-1 m-1 text-white bg-gray-500 rounded">
                    <RiDownload2Line className="w-4 text-white lg:w-5" />
                    테스트 다시 해보기
                  </button>
                  
                  {/* 현재 페이지의 URL을 복사하여 공유하는 버튼 */}
                  <button onClick={() => handleCopyClipboard(window.location.href)} className="p-1 m-1 text-white bg-gray-700 rounded">
                    공유하기
                  </button>
                  
                  {/* 홈으로 돌아가는 버튼 */}
                  <button onClick={() => router.push('/')} className="p-1 m-1 text-white bg-gray-600 rounded">
                    홈으로 돌아가기
                  </button>
                  
                  {/* 결과 이미지를 다운로드하는 버튼 */}
                  <button onClick={handleDownloadImage} className="p-1 m-1 text-white bg-gray-800 rounded">
                    이미지 저장하기
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* similarPolitics 카드 패널 추가 */}
            {resultData && resultData.similarPolitics && resultData.similarPolitics.length > 0 && (
              <div className="w-full mt-10">
                <h2 className="text-2xl font-bold text-slate-800">유사한 정치인</h2>
                <div className="flex flex-wrap justify-center">
                  {resultData.similarPolitics.map((politician: any) => (
                    <IndexCardItem
                      key={politician.id}
                      name={politician.name}
                      username={politician.party}
                      src={`/politician_image/${politician.code}.jpg`}
                      initials={politician.committee}
                      code={politician.code} // 코드 추가
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ResultPage;
