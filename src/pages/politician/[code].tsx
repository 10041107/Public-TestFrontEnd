import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PoliticianDetail = () => {
  const router = useRouter();
  const { code } = router.query;
  const [politician, setPolitician] = useState(null);

  useEffect(() => {
    if (code) {
      const fetchPolitician = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/politician/${code}`);
          setPolitician(response.data);
        } catch (error) {
          console.error('Error fetching politician details:', error);
        }
      };
      fetchPolitician();
    }
  }, [code]);

  if (!politician) return <div>Loading...</div>;

  return (
    <div>
      <h1>{politician.name}</h1>
      <img src={`/politician_image/${politician.code}.jpg`} alt={politician.name} />
      <p>{politician.description}</p>
      <p>소속 정당: {politician.party}</p>
      <p>위원회: {politician.committee}</p>
      <p>이메일: {politician.email}</p>
      <p>지역: {politician.local}</p>
      <p>홈페이지: <a href={politician.homepage}>{politician.homepage}</a></p>
      <p>경력: {politician.career}</p>
      <p>외교 의견: {politician.diplomat_opinion}</p>
      <p>사회 의견: {politician.society_opinion}</p>
      <p>경제 의견: {politician.economy_opinion}</p>
      <p>법률 의견: {politician.law_opinion}</p>
    </div>
  );
};

export default PoliticianDetail;
