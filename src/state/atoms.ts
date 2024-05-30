import { atom } from 'recoil';
import { QuizResult } from '../pages/publics/quiz/result'; 

export const quizResultState = atom<QuizResult | null>({
  key: 'quizResultState',
  default: null,
});
