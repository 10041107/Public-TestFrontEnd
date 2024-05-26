import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getPoliticianList } from '../../services/api';
import { Card, List, Skeleton, Button } from 'antd';

interface Politician {
  name: string;
  code: string;
  party: string;
}

const PoliticianList = () => {
  const router = useRouter();
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticianList = async () => {
      try {
        const data = await getPoliticianList();
        setPoliticians(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliticianList();
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <div className="container p-4 mx-auto">
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={politicians}
        renderItem={politician => (
          <List.Item>
            <Card title={politician.name}>
              <p><strong>Code:</strong> {politician.code}</p>
              <p><strong>Party:</strong> {politician.party}</p>
              <Button type="primary" onClick={() => router.push(`/politician/${politician.code}`)}>
                View Details
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PoliticianList;
