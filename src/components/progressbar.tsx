import { motion } from "framer-motion";

interface Props {
  currentNum: number;
  listLength?: number;
}

const ProgressBar = ({ currentNum, listLength = 12 }: Props) => {
  const progressBarWidth = `${(currentNum / listLength) * 100}%`;

  return (
    <div className="rounded-3xl shadow-sm overflow-hidden select-none">
      <div className="relative h-2 flex items-center justify-center bg-neutral-200 rounded-3xl">
        <motion.span
          initial={{ width: progressBarWidth }}
          animate={{ width: progressBarWidth }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="absolute top-0 bottom-0 left-0 rounded-3xl bg-neutral-500"
        ></motion.span>
      </div>
    </div>
  );
};

export default ProgressBar;
