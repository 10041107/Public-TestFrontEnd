import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQnAList } from "./quiz";
import { motion } from "framer-motion";
import Header from "./header";
import ProgressBar from "./progressbar";
import { QuestionType } from "../types";
import Spinner from "../components/Spinner";
import { submitQuizAnswers, fetchUserProfile } from "../services/api";
import { useRecoilState } from 'recoil';
import { quizResultState } from '../state/atoms';

const shortAnswerQuestions = [
  `2016년 성주에 사드를 배치한다고 했을 때,`,
  `농민의 보호와 국산 쌀에 대한 보호를 위해서,`,
  `데이트 폭력은,`,
  `금투세는,`,
  `역사왜곡금지법은,`,
];

const calculateInterest = (answers: number[]): number => {
  const strongOpinions = answers.filter(a => a === 1 || a === 2 || a === 4 || a === 5).length;
  return (strongOpinions / answers.length) * 100; // 비율을 퍼센트로 반환
};

const calculateEngagement = (shortAnswers: string[]): number => {
  const totalLength = shortAnswers.reduce((acc, answer) => acc + answer.length, 0);
  return totalLength / shortAnswers.length; // 평균 길이 반환
};

const calculateConsistency = (answers: number[]): number => {
  let leftCount = 0;
  let rightCount = 0;

  answers.forEach(answer => {
    if (answer <= 2) leftCount++; // 좌파 성향
    if (answer >= 4) rightCount++; // 우파 성향
  });

  return (Math.abs(leftCount - rightCount) / answers.length) * 100; // 일관성 비율
};

const calculateNeutrality = (answers: number[]): number => {
  const neutralAnswers = answers.filter(a => a === 3).length;
  return (neutralAnswers / answers.length) * 100; // 중립성 비율
};

const calculateResults = (answers: number[], shortAnswers: string[]) => {
  return {
    interest: calculateInterest(answers),
    engagement: calculateEngagement(shortAnswers),
    consistency: calculateConsistency(answers),
    neutrality: calculateNeutrality(answers),
  };
};

const QnA = () => {
  const router = useRouter();
  const [sex, setSex] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [num, setNum] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shortAnswers, setShortAnswers] = useState<string[]>(Array(shortAnswerQuestions.length).fill(''));
  const [showWaiting, setShowWaiting] = useState(false);
  const [uid, setUid] = useState<number | null>(null);
  const [result, setResult] = useRecoilState(quizResultState);

  const { isError, data: questionsList } = useQuery<QuestionType[]>({
    queryKey: ["questions"],
    queryFn: getQnAList,
    staleTime: Infinity,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userData = await fetchUserProfile();
        setUid(userData.id);
      } catch (error: any) {
        console.error('Error fetching user profile:', error);
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (num > 25 && answers.length === 20) {
      setShowWaiting(true);
    }
  }, [num, answers, shortAnswers]);

  const handleAnswerClick = useCallback((option: number) => {
    setAnswers((prevAnswers) => [...prevAnswers, option]);
    setNum((prevNum) => prevNum + 1);
  }, []);

  const handleShortAnswerChange = (index: number, value: string) => {
    if (value.length <= 300) {
      const newShortAnswers = [...shortAnswers];
      newShortAnswers[index] = value;
      setShortAnswers(newShortAnswers);
    }
  };
  

  const handleSubmit = useCallback(async () => {
    if (uid === null || age === null) {
      console.error('User ID or age is null');
      return;
    }

    try {
      const data = {
        sex,
        age,
        uid: uid.toString(),  
        choiceAnswers: answers,
        shortAnswers,
      };

      console.log('Submitting data:', data);

      // 성향 분석 결과 계산
      const analysisResults = calculateResults(answers, shortAnswers);

      const response = await submitQuizAnswers(data);
      console.log('Response:', response);

      // 상태에 데이터 저장
      setResult({ ...response, analysisResults });

      // 결과 페이지로 이동
      router.push('/publics/quiz/result');
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  }, [sex, age, uid, answers, shortAnswers, setResult, router]);

  useEffect(() => {
    if (showWaiting) {
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [showWaiting, handleSubmit]);

  if (isError) return <div className="flex items-center justify-center"><h2>에러가 발생했습니다. 다시 시도해주세요!</h2></div>;

  if (showWaiting) {
    return <Spinner />;
  }

  const renderSexAgeQuestion = () => (
    <motion.div className="flex flex-col items-center justify-center flex-grow w-full gap-10 mt-32 lg:gap-20 mb-14 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        <h2 className="text-2xl lg:text-4xl text-neutral-600">성별을 선택해주세요.</h2>
        <div className="flex gap-4 mt-4">
          <button className={`px-4 py-2 rounded ${sex === 'male' ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('male')}>남성</button>
          <button className={`px-4 py-2 rounded ${sex === 'female' ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('female')}>여성</button>
          <button className={`px-4 py-2 rounded ${sex === 'other' ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('other')}>기타</button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}>
        <h2 className="text-2xl lg:text-4xl text-neutral-600">나이를 선택해주세요.</h2>
        <div className="flex gap-4 mt-4">
          <button className={`px-4 py-2 rounded ${age === 10 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(10)}>10대</button>
          <button className={`px-4 py-2 rounded ${age === 20 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(20)}>20대</button>
          <button className={`px-4 py-2 rounded ${age === 30 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(30)}>30대</button>
          <button className={`px-4 py-2 rounded ${age === 40 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(40)}>40대</button>
          <button className={`px-4 py-2 rounded ${age === 50 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(50)}>50대</button>
          <button className={`px-4 py-2 rounded ${age === 60 ? 'bg-neutral-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(60)}>60대 이상</button>
        </div>
      </motion.div>
      <button onClick={() => setNum(1)} className="self-end px-4 py-2 mt-4 text-white rounded bg-neutral-500">다음</button>
    </motion.div>
  );

  const renderQuestion = (question: QuestionType) => (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
    <motion.div key={question.num} className="flex flex-col justify-center flex-grow w-full gap-10 mt-10 lg:gap-20 mb-14 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        
        <span className="text-2xl lg:text-4xl text-neutral-600">{question.num}.</span>
        <h2>{question.q}</h2>
      </motion.div>
      <motion.ul initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }} className="flex flex-col w-full gap-5 mb-20 lg:gap-8 lg:mb-32">
        {question.a.map((answer, idx) => (
          <li key={`${answer.option}${idx}`} onClick={() => handleAnswerClick(answer.score)} className="flex flex-col gap-2 px-5 py-3 duration-200 ease-in-out border-2 border-solid rounded-lg cursor-pointer border-neutral-500 lg:py-5 active:border-stone-300 active:border-2 active:bg-neutral-500 active:-translate-y-1">
            <span className="text-xs italic lg:text-base text-neutral-400">{answer.dialogue}</span>
            <span className=" lg:text-xl text-neutral-600">{answer.text}</span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
    </div>
  );

  const renderShortAnswerQuestion = (question: string, index: number) => (
    <div className="hide-scrollbar" style={{ height: '100vh', overflowY: 'scroll' }}>
    <motion.div key={index} className="flex flex-col justify-center flex-grow w-full gap-10 mt-10 mb-10 lg:gap-10 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        <span className="text-2xl lg:text-4xl text-neutral-600">{21 + index}.</span>
        <h2>{question}</h2>
        <h4 className="my-3 text-xl text-neutral-500">
        {index === 0 && `많은 논란이 있었는데요, 북한과 성주시 주민들의 반발은 물론이고 중국에서는 경제보복까지 했습니다. 그럼에도 불구하고 사드를 배치하는 것이 맞다고 생각하시나요?`}
        {index === 1 && "국내 쌀 수요 대비 초과 생산량이 35%이거나 쌀값이 전년보다 58% 하락할 때 정부가 초과 생산량을 모두 사들여야 한다고 생각하시나요?"}
        {index === 2 && "남성이 여성을 대상으로 한 일방적 범죄이며, 이 문제는 페미니즘이나 혹은 그에 준하는 여성주의 운동을 받아들임으로써 개선될 수 있다는 의견에 대해 어떻게 생각하시나요?"}
        {index === 3 && "(=주식, 채권, 펀드, 파생상품 등에 투자하여 일정 금액 이상의 소득을 올린 투자자에게 발생한 소득의 20~25% 만큼 부과하는 세금) 완화 혹은 폐지 되어야 하는가요? 아니면 시행해야 한다고 생각하시나요?"}
        {index === 4 && "(=역사적 사실을 왜곡하여 폄훼하거나 피해자 및 유가족을 이유 없이 모욕하는 행위를 처벌하고자 하는 것을 목표로 하는 법률안) 표현의 자유를 침해하고 민주주의를 위배하는 것인가요? 아니면 역사 인식과 피해자들을 보호하기 위해 꼭 필요한 것이라고 생각하시나요?"}
      </h4>
        <h5 className="text-xs text-neutral-400 hover:text-neutral-500">질문에 대한 생각을 자유롭게 작성해주세요. (공백 포함 최대 300자)</h5>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
      <textarea
        value={shortAnswers[index]}
        onChange={(e) => handleShortAnswerChange(index, e.target.value)}
        maxLength={300}
        className="w-full p-2 border-2 border-solid rounded-lg border-neutral-500 lg:py-5"
        rows={5}
      />
      <div className="text-sm text-left text-neutral-500">현재 글자 수 : {shortAnswers[index].length} / 300</div>
      <button onClick={() => setNum((prevNum) => prevNum + 1)} className="px-4 py-2 mt-4 text-white rounded hover:bg-neutral-600 bg-neutral-500">다음</button>
      </motion.div>
    </motion.div>
    </div>
  );
  

  return (
    <div className="px-5 flex-col  relative mx-auto w-full max-w-[45rem] min-h-screen justify-bottom">
      <Header setAnswers={setAnswers} currentNum={num} setNum={setNum} />
      <ProgressBar currentNum={num} listLength={(questionsList?.length ?? 0) + shortAnswerQuestions.length} />
      {num === 0 && renderSexAgeQuestion()}
      {questionsList?.map((question: QuestionType) => question.num === num && renderQuestion(question))}
      {shortAnswerQuestions.map((question, index) => num === 21 + index && renderShortAnswerQuestion(question, index))}
    </div>
  );
};

export default QnA;
