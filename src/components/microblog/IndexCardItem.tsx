import { Card } from 'antd';
import Button from '../microblog/Button';
import ColoredButton from './ColoredButton';
import { useRouter } from 'next/router';

interface Props { 
  name: string;
  username: string;
  src: string;
  initials: string;
  code: string; // 추가된 부분
}

const IndexCardItem = ({ name, username, src, initials, code }: Props) => {
  const router = useRouter();
  
  return (
    <div className='my-3 border-2 rounded-lg shadow-lg border-neutral-200'>
      <Card
        hoverable
        style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        cover={<div style={{ width: '150px', height: '150px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' , boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  marginTop: '25px' }}>
              <img alt={name} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover'  }} />
            </div>}
      >
        <div>
          <div className='justify-center'>
            <ColoredButton initials={initials}>{initials}</ColoredButton>
            <div className='grid items-center justify-center'>
              <h4 className="items-center mt-1 text-sm text-neutral-500">
                <span className="text-xs text-neutral-500">{username}</span> 소속
              </h4>
              <h4 className="font-bold mb-2text-lg text-neutral-700">{name}</h4>
              <div className="my-1 text-sm font-bold whitespace-nowrap">
                <Button size="small" onClick={() => router.push(`/politician/${code}`)}>둘러보기</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IndexCardItem;
