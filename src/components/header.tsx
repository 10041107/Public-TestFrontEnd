import { RiArrowLeftLine, RiHome2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { CONFIRM_GO_TO_MAIN } from "../utils/quizindex";


interface HeaderProps {
  setAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  currentNum: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({ setAnswers, currentNum, setNum }) => {
  const router = useRouter();

  const handleHomeBtnClick = () => {
    const ok = window.confirm(CONFIRM_GO_TO_MAIN);
    if (ok) router.push("/main");
  };

  const handleBackBtnClick = useCallback(
    (currentNum: number) => {
      if (currentNum === 1) router.push("/");

      setAnswers((prevAnswers) => prevAnswers.slice(0, -1));

      setNum((prevNum) => prevNum - 1);
    },
    [router, setAnswers, setNum]
  );

  return (
    <header className="w-full py-5">
      <ul className="flex justify-between text-stone-400">
        <li
          onClick={() => handleBackBtnClick(currentNum)}
          className="cursor-pointer"
        >
          <RiArrowLeftLine />
        </li>
        <li onClick={handleHomeBtnClick} className="cursor-pointer">
          <RiHome2Line />
        </li>
      </ul>
    </header>
  );
};

export default Header;
