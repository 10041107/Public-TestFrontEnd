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

const shortAnswerQuestions = [
  "주관식 1",
  "주관식 2",
  "주관식 3",
  "주관식 4",
  "주관식 5",
];

const QnA = () => {
  const router = useRouter();
  const [sex, setSex] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [num, setNum] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shortAnswers, setShortAnswers] = useState<string[]>(Array(shortAnswerQuestions.length).fill(''));
  const [result, setResult] = useState<string | null>(null);
  const [showWaiting, setShowWaiting] = useState(false);
  const [uid, setUid] = useState<number | null>(null);

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
    const newShortAnswers = [...shortAnswers];
    newShortAnswers[index] = value;
    setShortAnswers(newShortAnswers);
  };

  const handleSubmit = async () => {
    if (uid === null) {
      console.error('User ID is null');
      return;
    }

    try {
      const data = {
        sex,
        age,
        uid,  // uid 추가
        choiceAnswers: answers,
        shortAnswers,
      };

      console.log('Submitting data:', data);

      const response = await submitQuizAnswers(data);
      console.log('Response:', response);
      router.push(`/quiz/result/${response.resultCategory}`);
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  useEffect(() => {
    if (result && showWaiting) {
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [result, showWaiting, router]);

  if (isError) return <div className="flex items-center justify-center"><h2>에러가 발생했습니다. 다시 시도해주세요!</h2></div>;

  if (showWaiting) {
    return <Spinner />;
  }

  const renderSexAgeQuestion = () => (
    <motion.div className="flex flex-col items-center justify-center flex-grow w-full gap-10 lg:gap-20 mb-14 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        <h2 className="text-2xl lg:text-4xl text-neutral-600">성별을 선택해주세요.</h2>
        <div className="flex gap-4 mt-4">
          <button className={`px-4 py-2 rounded ${sex === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('male')}>남성</button>
          <button className={`px-4 py-2 rounded ${sex === 'female' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('female')}>여성</button>
          <button className={`px-4 py-2 rounded ${sex === 'other' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setSex('other')}>기타</button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}>
        <h2 className="text-2xl lg:text-4xl text-neutral-600">나이를 선택해주세요.</h2>
        <div className="flex gap-4 mt-4">
          <button className={`px-4 py-2 rounded ${age === 10 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(10)}>10대</button>
          <button className={`px-4 py-2 rounded ${age === 20 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(20)}>20대</button>
          <button className={`px-4 py-2 rounded ${age === 30 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(30)}>30대</button>
          <button className={`px-4 py-2 rounded ${age === 40 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(40)}>40대</button>
          <button className={`px-4 py-2 rounded ${age === 50 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(50)}>50대</button>
          <button className={`px-4 py-2 rounded ${age === 60 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setAge(60)}>60대 이상</button>
        </div>
      </motion.div>
      <button onClick={() => setNum(1)} className="self-end px-4 py-2 mt-4 text-white bg-blue-500 rounded">다음</button>
    </motion.div>
  );

  const renderQuestion = (question: QuestionType) => (
    <motion.div key={question.num} className="flex flex-col justify-center flex-grow w-full gap-10 lg:gap-20 mb-14 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        <span className="text-2xl lg:text-4xl text-neutral-600">{question.num}.</span>
        <h2>{question.q}</h2>
      </motion.div>
      <motion.ul initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }} className="flex flex-col w-full gap-5 mb-20 lg:gap-8 lg:mb-32">
        {question.a.map((answer, idx) => (
          <li key={`${answer.option}${idx}`} onClick={() => handleAnswerClick(answer.score)} className="flex flex-col gap-2 px-5 py-3 duration-200 ease-in-out border-2 border-solid rounded-lg cursor-pointer border-neutral-500 lg:py-5 active:border-stone-300 active:border-2 active:bg-neutral-500 active:-translate-y-1">
            <span className="text-sm italic lg:text-base text-neutral-400">{answer.dialogue}</span>
            <span className="lg:text-xl">{answer.text}</span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );

  const renderShortAnswerQuestion = (question: string, index: number) => (
    <motion.div key={index} className="flex flex-col justify-center flex-grow w-full gap-10 lg:gap-20 mb-14 lg:mb-0">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}>
        <span className="text-2xl lg:text-4xl text-neutral-600">{21 + index}.</span>
        <h2>{question}</h2>
      </motion.div>
      <textarea
        value={shortAnswers[index]}
        onChange={(e) => handleShortAnswerChange(index, e.target.value)}
        maxLength={300}
        className="w-full p-2 border-2 border-solid rounded-lg border-neutral-500 lg:py-5"
        rows={5}
      />
      <button onClick={() => setNum((prevNum) => prevNum + 1)} className="self-end px-4 py-2 mt-4 text-white bg-blue-500 rounded">다음</button>
    </motion.div>
  );

  return (
    <div className="px-5 flex flex-col relative mx-auto w-full max-w-[45rem] min-h-screen justify-between">
      <Header setAnswers={setAnswers} currentNum={num} setNum={setNum} />
      <ProgressBar currentNum={num} listLength={(questionsList?.length ?? 0) + shortAnswerQuestions.length} />
      {num === 0 && renderSexAgeQuestion()}
      {questionsList?.map((question: QuestionType) => question.num === num && renderQuestion(question))}
      {shortAnswerQuestions.map((question, index) => num === 21 + index && renderShortAnswerQuestion(question, index))}
    </div>
  );
};

export default QnA;
