import Button from './Button';
import ColoredButton from './ColoredButton';
import Avatar from './radix/Avatar';

interface Props {
	name: string;
	username: string;
	src: string;
	initials: string;
}

const PanelItem = ({ name, username, src, initials }: Props) => (
	<div className="flex items-center flex-1 px-4 py-3 gap-x-2 hover:bg-neutral-200">
		<div className="flex items-center flex-1 gap-x-2">
			<div className="flex justify-start flex-none">
				<Avatar src={src} alt={name} initials={initials} />
			</div>
			<div className="mt-4">
			<p className="items-center text-base font-semibold text-neutral-500">
				<span className="text-xs text-neutral-500">{username}</span> 소속 <span className="text-neutral-800">{name}</span>
			</p>

      <ColoredButton initials={initials}>{initials}</ColoredButton>
    

			</div>
		</div>
		<div className="whitespace-nowrap">
			<Button size="small">팔로우</Button>
		</div>
	</div>
);

export default PanelItem;
