// src/state/atoms.ts
import { atom } from 'recoil';

const isDevelopment = process.env.NODE_ENV === 'development';
const uniqueSuffix = isDevelopment ? `_${Math.random().toString(36).substr(2, 5)}` : '';

export const quizResultState = atom({
  key: `quizResultState${uniqueSuffix}`, // 고유한 키를 사용합니다
  default: {
    totalScore: 0,
    legalScore: 0,
    economyScore: 0,
    societyScore: 0,
    securityScore: 0,
    similarPolitics: [],
  },
});
