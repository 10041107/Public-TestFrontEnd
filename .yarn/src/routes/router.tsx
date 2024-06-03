import { useRouter } from 'next/router';

const Result = () => {
  const router = useRouter();
  const { result } = router.query;

  return (
    <div>
      <h1>Result: {result}</h1>
    </div>
  );
};

export default Result;
