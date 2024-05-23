import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQnAList } from "./quiz";
import { motion } from "framer-motion";
import Header from "./header";
import ProgressBar from "./progressbar";
import { QuestionType } from "../types";

const QnA = () => {
  const router = useRouter();
  const [num, setNum] = useState<number>(1);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [showWaiting, setShowWaiting] = useState(false);

  const { isError, data: questionsList } = useQuery<QuestionType[]>({
    queryKey: ["questions"],
    queryFn: getQnAList,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (num > 20 && answers.length === 20) {
      const score = answers.reduce((sum, current) => sum + current, 0);
      let resultCategory;

      if (score <= 30) resultCategory = 'left';
      else if (score <= 50) resultCategory = 'centerLeft';
      else if (score <= 69) resultCategory = 'centerRight';
      else resultCategory = 'right';

      setResult(resultCategory);
      setShowWaiting(true);
    }
  }, [num, answers]);

  const handleAnswerClick = useCallback((option: number) => {
    setAnswers((prevAnswers) => [...prevAnswers, option]);
    setNum((prevNum) => prevNum + 1);
  }, []);

  if (isError) return <div className="flex items-center justify-center"><h2>에러가 발생했습니다. 다시 시도해주세요!</h2></div>;

  if (result && showWaiting) {
    setTimeout(() => {
      console.log('Navigating with result:', result); 
      router.push(`/quiz/result/${result}`);
    }, 5000);
  }

  return (
    <div className="px-5 flex flex-col relative mx-auto w-full max-w-[45rem] min-h-screen justify-between">
      <Header setAnswers={setAnswers} currentNum={num} setNum={setNum} />
      <ProgressBar currentNum={num} listLength={questionsList?.length} />
      {questionsList?.map((question: QuestionType) => question.num === num && (
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
      ))}
    </div>
  );
};

export default QnA;
