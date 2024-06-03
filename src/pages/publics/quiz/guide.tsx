import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { RiErrorWarningFill } from '@remixicon/react';

const GuidePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-5 bg-gray-100">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }} 
        className="text-3xl font-bold text-center text-gray-700"
      >

       <RiErrorWarningFill size={60} color='grey' />


      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }} 
        className="text-center text-neutral-600"
      >
        정치적 견해와 가치관을 평가하여 <br/> 자신이 어떤 정치적 스펙트럼에 속하는지 <br/> 이해하기 위한 테스트입니다.
        <br/> <br/>
        20개의 객관식, 5개의 주관식 문제로 구성되어 있습니다.
        <br/> <br/>
        절대적인 진실을 반영하는 것은 아니니 <br/> 참고 자료로만 활용해주세요.

        </motion.p>
        <hr/>
        <motion.p 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 } }} 
        className="text-center"
      >
        편하게 자신의 생각을 답해주세요.  <br/> 시작합니다!
        </motion.p>



      <motion.button
        onClick={() => router.push('/publics/quiz/test')}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }}
        className="px-6 py-3 text-white rounded-lg cursor-pointer lg:text-xl bg-neutral-400 hover:bg-neutral-500"
      >
        OK!
      </motion.button>
    </div>
  );
};

export default GuidePage;
