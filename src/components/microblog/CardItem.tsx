import { Card } from 'antd';
import Button from '../microblog/Button';
import ColoredButton from './ColoredButton';

interface Props {
  name: string;
  username: string;
  src: string;
  initials: string;
}

const IndexCardItem = ({ name, username, src, initials }: Props) => (
	<div className='border-2 rounded-lg border-neutral-200'>
  <Card
    hoverable
    style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    cover={<div style={{ width: '300px', height: '300px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<img alt={name} src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
					</div>}
  >
    <div>
		<div className='items-center justify-center'>
			<ColoredButton initials={initials}>{initials}</ColoredButton>
			<h4 className="items-center mt-1 text-sm text-neutral-500">
				<span className="text-xs text-neutral-500">{username}</span> 소속
			</h4>
				<h4 className="font-bold mb-2text-lg text-neutral-700">{name}</h4>

			</div>

      <div className="text-sm font-bold whitespace-nowrap">
        <Button size="small">팔로우</Button>
      </div>
     </div>
  		</Card>

    </div>
);

export default IndexCardItem;

