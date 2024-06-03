import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { MAIN_DESCRIPTION } from '../utils/quizindex';

const Introduce = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col mb-10 select-none gap-y-12 lg:mb-0">
      <motion.header className="flex flex-col items-center gap-7">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}>
          <img className="w-auto h-20 sm:h-20" src="/free-icon-vote-5427240.png" alt="로고이미지" />
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        >
          <h3 className="text-neutral-500">
            {MAIN_DESCRIPTION}
          </h3>
          <h1
            className="text-transparent bg-gradient-to-r from-neutral-700 via-stone-500 to-neutral-400 bg-clip-text"
          >
            정치 성향 테스트
          </h1>
        </motion.div>
      </motion.header>
      <motion.button
        onClick={() => router.push('/publics/quiz/guide')}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}
        className="px-6 py-3 text-white rounded-lg cursor-pointer lg:text-xl bg-neutral-400 hover:bg-neutral-500"
      >
        시작하기
      </motion.button>
    </div>
  );
};

export default Introduce;
