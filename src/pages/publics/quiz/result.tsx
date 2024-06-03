import { RiDownload2Line, RiHome2Line, RiArrowGoForwardFill, RiMessage2Fill, RiChatDownloadLine    } from "@remixicon/react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from "react";
import NavigationToggleButton from '@/components/NavigationToggleButton';
import { AnimatePresence, motion } from 'framer-motion';
import { DrawerNavigation } from "../../../components/navigation";
import { useRecoilValue } from 'recoil';
import { quizResultState } from '../../../state/atoms';
import JSConfetti from 'js-confetti';
import { Radar, Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const resultImages: { [key: string]: string } = {
  left: '/result-images/left.png',
  centerLeft: '/result-images/centerLeft.png',
  centerRight: '/result-images/centerRight.png',
  right: '/result-images/right.png',
};

const ResultPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const router = useRouter();
  const resultData = useRecoilValue(quizResultState);
  const [resultImage, setResultImage] = useState<string>('');
  const [animatedScores, setAnimatedScores] = useState({
    totalScore: 0,
    legalScore: 0,
    economyScore: 0,
    societyScore: 0,
    securityScore: 0,
  });

  useEffect(() => {
    if (resultData) {
      const score = resultData.totalScore;
      let category;
      if (score <= 35) category = 'left';
      else if (score <= 50) category = 'centerLeft';
      else if (score <= 64) category = 'centerRight';
      else category = 'right';

      setResultImage(resultImages[category]);

      const jsConfetti = new JSConfetti();
      let confettiColors;
      switch (category) {
        case 'left':
          confettiColors = ["#1e90ff", "#4169e1", "#e0ffff"];
          break;
        case 'centerLeft':
          confettiColors = ["#87cefa", "#b0e0e6", "#ffffff"];
          break;
        case 'centerRight':
          confettiColors = ["#e9967a", "#ffc0cb", "#ffffff"];
          break;
        case 'right':
          confettiColors = ["#ff0000", "#f08080", "#e9967a"];
          break;
        default:
          confettiColors = ["#f0fff0", "#d3d3d3", "#dcdcdc"];
      }
      jsConfetti.addConfetti({
        confettiColors,
        confettiRadius: 5,
        confettiNumber: 500,
      });

      const incrementScores = (targetScores: QuizResult, duration: number) => {
        const start = performance.now();
        const step = (timestamp: number) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          setAnimatedScores({
            totalScore: Math.floor(progress * targetScores.totalScore),
            legalScore: Math.floor(progress * targetScores.legalScore),
            economyScore: Math.floor(progress * targetScores.economyScore),
            societyScore: Math.floor(progress * targetScores.societyScore),
            securityScore: Math.floor(progress * targetScores.securityScore),
          });
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      };

      incrementScores(resultData, 2000); // 2 seconds duration for animation

    } else {
      // 데이터가 없으면 퀴즈 페이지로 리디렉션
      router.push('/publics/quiz/main');
    }
  }, [router, resultData]);

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
        return `결果를 찾을 수 없습니다.`;
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
    router.push("/publics/quiz/test");
  };

  const radarData = {
    labels: ['외교/안보', '사회', '경제', '법/제도'],
    datasets: [
      {
        label: 'Scores',
        data: [
          animatedScores.securityScore,
          animatedScores.societyScore,
          animatedScores.economyScore,
          animatedScores.legalScore,
        ],
        backgroundColor: 'rgba(153, 153, 153, 0.5)',
        borderColor: 'rgba(102, 102, 102, 0.8)',
        borderWidth: 1,
      },
    ],
  };
  
  const radarOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 25, // 최대치를 25로 설정
        ticks: {
          stepSize: 5,
          backdropColor: 'rgba(255, 255, 255, 0.75)',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
        angleLines: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: '#666',
        },
      },
    },
  };
  const createHorizontalBarData = (score: number) => ({
    labels: [' '],
    datasets: [
      {
        label: 'Scores',
        data: [
          score - 12.5,
        ],
        backgroundColor: 'rgba(153, 153, 153, 0.5)',
        borderColor: 'rgba(102, 102, 102, 0.8)',
        borderWidth: 1,
      },
    ],
  });
  
  const options2 = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false, // 이 부분 추가
    scales: {
      x: {
        min: -12.5,
        max: 12.5,
        grid: {
          color: '#e0e0e0', // 그리드 라인 색상 변경
          borderDash: [5, 5], // 그리드 라인을 점선으로 변경
        },
        ticks: {
          callback: function(value: number) {
            return value + 12.5; // 중앙점을 기준으로 값 표시
          },
          color: '#4a4a4a', // 축 라벨 색상 변경
          font: {
            size: 14, // 축 라벨 글꼴 크기
          },
        },
      },
      y: {
        grid: {
          display: false, // y축 그리드 라인 숨기기
        },
        ticks: {
          color: '#4a4a4a', // 축 라벨 색상 변경
          font: {
            size: 14, // 축 라벨 글꼴 크기
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        backgroundColor: 'rgba(153, 153, 153, 0.5)',
        titleColor: '#4a4a4a', // 툴팁 제목 색상
        bodyColor: '#4a4a4a', // 툴팁 본문 색상
        borderColor: 'rgba(102, 102, 102, 0.8)',
        borderWidth: 1, // 툴팁 테두리 두께
      },
    },
  };

  const createHorizontalBarData2 = (score: number) => ({
    labels: [' '],
    datasets: [
      {
        label: 'Scores',
        data: [
          score,
        ],
        backgroundColor: 'rgba(153, 153, 153, 0.5)',
        borderColor: 'rgba(102, 102, 102, 0.8)',
        borderWidth: 1,
      },
    ],
  });
  
  const options3 = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false, // 이 부분 추가
    scales: {
      x: {
        min: 0, // 최소값 0 설정
        max: 100, // 최대값 100 설정
        grid: {
          color: '#e0e0e0', // 그리드 라인 색상 변경
          borderDash: [5, 5], // 그리드 라인을 점선으로 변경
        },
        ticks: {
          callback: function(value: number) {
            return value; // 중앙점을 기준으로 값 표시
          },
          color: '#4a4a4a', // 축 라벨 색상 변경
          font: {
            size: 14, // 축 라벨 글꼴 크기
          },
        },
      },
      y: {
        grid: {
          display: false, // y축 그리드 라인 숨기기
        },
        ticks: {
          color: '#4a4a4a', // 축 라벨 색상 변경
          font: {
            size: 14, // 축 라벨 글꼴 크기
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        backgroundColor: 'rgba(153, 153, 153, 0.5)', // 툴팁 배경색
        titleColor: '#4a4a4a', // 툴팁 제목 색상
        bodyColor: '#4a4a4a', // 툴팁 본문 색상
        borderColor: 'rgba(102, 102, 102, 0.8)',
        borderWidth: 1, // 툴팁 테두리 두께
      },
    },
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
        <div className="flex items-center justify-center min-h-screen ">
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

              <h1 className="text-4xl font-bold text-Neutral-800">당신의 정치적 성향은?</h1>
              {resultData && (
                <h4 className="text-xl text-Neutral-400">{getMessage(resultData.totalScore <= 30 ? 'left' : resultData.totalScore <= 50 ? 'centerLeft' : resultData.totalScore <= 69 ? 'centerRight' : 'right')}</h4>
              )}
              <hr className="h-1 my-1 border-0 bg-stone-400"/>

              {resultImage && (
                <Image src={resultImage} alt="Result Image" width={620} height={500} />
              )}

              <hr className="w-full my-5 border-1 "/>
              <h2 className="mt-8 text-2xl font-semibold text-Neutral-600">결과 풀이</h2>
              <hr className="w-1/2 border-neutral-200 border-1" />
              {resultData && ( 
                <div className="flex flex-col items-center w-11/12 p-4 my-3 border-2 rounded-md shadow-lg sm:w-7/12 card">


                  <h2 className="my-3 text-2xl font-semibold text-Neutral-600 ">통합 점수</h2>

                  <h3 className="my-2 text-sm text-Neutral-700">
                    모든 질문에 대한 답변을 바탕으로 전체적인 정치 성향을 평가합니다. <br/>
                    특정 이슈에 대해 얼마나 진보적이거나 보수적인지를 종합적으로 평가한 것입니다.
                  </h3>

                  <p className="w-8/12 w-11/12 my-4 text-xs sm: text-Neutral-500">
                    {animatedScores.totalScore > 50 ? (
                      <>
                        보수적인 성향이 있습니다. 전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있는 사람입니다. <br/> 
                        대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 강력한 군사력과 국가 주권을 지지하는 사람입니다.
                      </>
                    ) : (
                      <>
                        진보적인 성향이 있습니다. 사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. 대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
                      </>
                    )}
                  </p>
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                    className="mb-4 text-2xl text-Neutral-600"
                  >
                    {animatedScores.totalScore}  / 100
                  </motion.h2>
                  <hr className="w-1/3 border-neutral-200 border-1"/>
                  <hr className="w-full border-neutral-200 border-1"/>
                  <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '400px' }}>
                    <Radar data={radarData} options={radarOptions} />
                  </div>

                </div>
              )}

<h2 className="text-2xl font-semibold mt-14 text-Neutral-600">세부 정산 결과</h2>
<hr className="w-1/2 border-neutral-200 border-1" />
{resultData && (
  <div className="grid w-11/12 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2">
    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">외교/안보 점수</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        국가 안보와 외교 정책에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {animatedScores.securityScore > 12.5 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {animatedScores.securityScore} / 25
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData(animatedScores.securityScore)} options={options2} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">사회 점수</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        사회적 이슈에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {animatedScores.societyScore > 12.5 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {animatedScores.societyScore} / 25
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData(animatedScores.societyScore)} options={options2} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">경제 점수</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        경제적 이슈에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {animatedScores.economyScore > 12.5 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {animatedScores.economyScore} / 25
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData(animatedScores.economyScore)} options={options2} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">법/제도 점수</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        법과 제도에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {animatedScores.legalScore > 12.5 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {animatedScores.legalScore} / 25
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData(animatedScores.legalScore)} options={options2} />
      </div>
    </div>
  </div>
)}

<h2 className="mt-16 text-2xl font-semibold text-Neutral-600">기타 평가 결과</h2>
<hr className="w-1/2 border-neutral-200 border-1" />

{resultData && resultData.analysisResults && (
  <div className="grid w-11/12 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2">
    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">관심도</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        사회적 이슈에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {resultData.analysisResults.interest > 50 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {resultData.analysisResults.interest.toFixed(2)} 
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData2(resultData.analysisResults.interest)} options={options3} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">참여도</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        사회적 이슈에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {resultData.analysisResults.engagement > 50 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {resultData.analysisResults.engagement.toFixed(2)}
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData2(resultData.analysisResults.engagement)} options={options3} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
      <h2 className="my-3 text-2xl font-semibold text-Neutral-600">일관성</h2>
      <h3 className="w-8/12 my-2 text-sm text-center text-Neutral-700">
        사회적 이슈에 대해 어떤 입장을 가지고 있는지를 평가합니다.
      </h3>
      <p className="w-8/12 my-4 text-xs text-center text-Neutral-500">
        {resultData.analysisResults.consistency > 50 ? (
          <>
            전통적인 가치와 강한 국가 안보, 경제적 자유를 중요시하는 경향이 있습니다. <br />
            대개 정부의 역할을 최소화하고, 시장의 자율성을 강조하며, 군사력과 국가 주권을 지지하는 사람입니다.
          </>
        ) : (
          <>
            사회적 평등과 복지, 정부 개입을 통한 경제적 재분배를 중시합니다. <br />
            대개 소수자 권리 보호, 사회적 정의, 환경 보호 등 진보적 의제를 지지하며, 정부의 적극적인 역할을 강조하는 사람입니다.
          </>
        )}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        className="mb-4 text-2xl text-Neutral-600"
      >
        {resultData.analysisResults.consistency.toFixed(2)}
      </motion.h2>
      <hr className="w-1/3 border-neutral-200 border-1" />
      <hr className="w-1/2 border-neutral-200 border-1" />
      <div className="flex justify-center w-11/12 max-w-4xl mt-4" style={{ height: '55px' }}>
        <Bar data={createHorizontalBarData2(resultData.analysisResults.consistency)} options={options3} />
      </div>
    </div>

    <div className="flex flex-col items-center p-4 border-2 rounded-md shadow-lg card">
                  <motion.div
                      initial={{ opacity: 0, y: -60 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                      className="grid flex-col items-center justify-center flex-grow w-full gap-0"
                    >
                      <div className="grid items-center w-9/12 m-5 place-items-center">
                        <button onClick={handleResetTest} className="flex items-center justify-center p-2 m-1 my-2 text-white rounded whitespace-nowrap bg-neutral-400 w-52">
                          <RiArrowGoForwardFill  className="w-5 mr-2 text-white lg:w-5" />
                          테스트 다시 해보기
                        </button>

                        <button onClick={() => handleCopyClipboard(window.location.href)} className="flex items-center justify-center p-2 m-1 my-2 text-white rounded whitespace-nowrap bg-neutral-500 w-52">
                          <RiMessage2Fill  className="w-5 mr-2 text-white lg:w-5" />
                          공유하기
                        </button>

                        <button onClick={() => router.push('/')} className="flex items-center justify-center p-2 m-1 my-2 text-white rounded whitespace-nowrap bg-neutral-600 w-52">
                          <RiDownload2Line className="w-5 mr-2 text-white lg:w-5" />
                          홈으로 돌아가기
                        </button>

                        <button onClick={handleDownloadImage} className="flex items-center justify-center p-2 m-1 my-2 text-white rounded whitespace-nowrap bg-neutral-700 w-52">
                          <RiChatDownloadLine  className="w-5 mr-2 text-white lg:w-5" />
                          이미지 저장하기
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default ResultPage;




