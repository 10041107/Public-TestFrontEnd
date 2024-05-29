import { Card } from 'antd';
import Button from './Button';
import ColoredButton from './ColoredButton';

interface Props {
  name: string;
  username: string;
  src: string;
  initials: string;
}

const IndexCardItem = ({ name, username, src, initials }: Props) => (
  <div className='border-2 border-neutral-200'>
    <Card
      hoverable
      style={{ width: 300, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      cover={<div style={{ width: '300px', height: '70px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={name} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>}
    >
      <div style={{ textAlign: 'center', margin: '0 auto'}}>
        <div className='flex-col items-center justify-center'>
          <h4 className="items-center text-sm font-bold text-neutral-500">
            <span className="text-xs font-bold text-neutral-600">{username}</span> 소속
          </h4>
          <div className="flex items-center justify-center mb-0">
            <h4 className="text-lg font-bold whitespace-nowrap text-neutral-700">{name}</h4>
            <span className="ml-1 text-xs whitespace-nowrap text-neutral-500">
              <ColoredButton initials={initials}>{initials}</ColoredButton>
            </span>
          </div>
          <div className="text-sm font-bold whitespace-nowrap">
            <Button size="small">팔로우</Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default IndexCardItem;
