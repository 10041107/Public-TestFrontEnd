import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchUserProfile, fetchQuizResult } from '../../services/api';

interface User {
  id: number;
  userName: string;
  email: string;
  nickname: string;
  gender: string;
  ageGroup: string;
  region: string;
}

interface SimilarPolitician {
  name: string;
  img: string;
  url: string;
  scores: {
    totalScore: number;
    legalScore: number;
    economyScore: number;
    societyScore: number;
    securityScore: number;
  };
}

interface QuizResult {
  totalScore: number;
  legalScore: number;
  economyScore: number;
  societyScore: number;
  securityScore: number;
  similarPolitics: SimilarPolitician[];
}

export default function MyResult() {
  const [user, setUser] = useState<User | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndResult = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const userData = await fetchUserProfile(token);
        setUser(userData);
        const quizResult = await fetchQuizResult(token);
        setResult(quizResult);
      } catch (error: any) {
        setError(error.response?.data?.message || error.message || 'Unknown error');
        router.push('/login');
      }
    };

    fetchUserAndResult();
  }, [router]);

  if (error) {
    return <div className="flex items-center justify-center h-screen">{error}</div>;
  }

  if (!user || !result) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-screen-lg p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Political Quiz Result</h1>
      <h2>{user.userName} 님의 퀴즈 결과</h2>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Scores</h2>
        <p>Total Score: {result.totalScore}</p>
        <p>Legal Score: {result.legalScore}</p>
        <p>Economy Score: {result.economyScore}</p>
        <p>Society Score: {result.societyScore}</p>
        <p>Security Score: {result.securityScore}</p>
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">Similar Politicians</h2>
        {result.similarPolitics.map((politician, index) => (
          <div key={index} className="p-4 mb-4 border rounded shadow-md">
            <h3 className="text-lg font-bold">{politician.name}</h3>
            <img src={politician.img} alt={politician.name} className="w-32 h-32 mb-2 rounded-full" />
            <p>
              <a href={politician.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View Profile
              </a>
            </p>
            <div>
              <h4 className="font-semibold">Scores:</h4>
              <p>Total Score: {politician.scores.totalScore}</p>
              <p>Legal Score: {politician.scores.legalScore}</p>
              <p>Economy Score: {politician.scores.economyScore}</p>
              <p>Society Score: {politician.scores.societyScore}</p>
              <p>Security Score: {politician.scores.securityScore}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
