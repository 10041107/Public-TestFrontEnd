import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPoliticianDetails } from '@/lib/api';
import { Button, Card, Skeleton } from 'antd';
import { ParsedUrlQuery } from 'querystring';

interface Politician {
  name: string;
  code: string;
  gender: string;
  party: string;
  election_type: string;
  committee: string;
  email: string;
  birth_date: string;
  local: string;
  homepage: string;
  career: string;
}

interface Params extends ParsedUrlQuery {
  code: string;
}

const PoliticianDetails = ({ code }: { code: string }) => {
  const router = useRouter();
  const [politician, setPolitician] = useState<Politician | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticianDetails = async () => {
      try {
        const data = await getPoliticianDetails(code);
        setPolitician(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchPoliticianDetails();
    }
  }, [code]);

  if (loading) {
    return <Skeleton active />;
  }

  if (!politician) {
    return <p>Politician not found</p>;
  }

  return (
    <div className="container p-4 mx-auto">
      <Card title={politician.name} bordered={false}>
        <p><strong>Code:</strong> {politician.code}</p>
        <p><strong>Gender:</strong> {politician.gender}</p>
        <p><strong>Party:</strong> {politician.party}</p>
        <p><strong>Election Type:</strong> {politician.election_type}</p>
        <p><strong>Committee:</strong> {politician.committee}</p>
        <p><strong>Email:</strong> {politician.email}</p>
        <p><strong>Birth Date:</strong> {politician.birth_date}</p>
        <p><strong>Local:</strong> {politician.local}</p>
        <p><strong>Homepage:</strong> <a href={politician.homepage} target="_blank" rel="noopener noreferrer">{politician.homepage}</a></p>
        <p><strong>Career:</strong> {politician.career}</p>
      </Card>
      <Button type="primary" onClick={() => router.push('/politician')}>
        Back to List
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params as Params;
  return {
    props: { code },
  };
};

export default PoliticianDetails;
