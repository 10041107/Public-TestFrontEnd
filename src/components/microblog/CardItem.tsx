import { Card } from 'antd';
import Button from '../microblog/Button';
import ColoredButton from './ColoredButton';
import { useRouter } from 'next/router';

interface Props {
  name: string;
  username: string;
  src: string;
  initials: string;
  code: string; 
}

const IndexCardItem = ({ name, username, src, initials, code }: Props) => {
  const router = useRouter();

  return (
    <div className='my-3 rounded-lg shadow-lg border-neutral-200'>
      <Card
        hoverable
        style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        cover={
          <div style={{ width: '150px', height: '150px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' , boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  marginTop: '25px' }}>
            <img alt={name} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover'  }} />
          </div>
        }
      >
        <div>
          <div className='justify-center'>
            <ColoredButton initials={initials}>{initials}</ColoredButton>
            <div className='grid items-center justify-center'>
              <h4 className="items-center mt-1 text-sm text-neutral-500">
                <span className="text-xs text-neutral-500">{username}</span> 소속
              </h4>
              <h4 className="mb-2 text-lg font-bold text-neutral-700">{name}</h4> {/* 수정: mb-2와 text-lg 사이에 공백 추가 */}
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
