import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import cx from 'classnames';
import Button from '../Button';
import Avatar from './Avatar';
import UserCard from '../UserCard';

interface Props {
	src: string;
	alt: string;
	initials: string;
	name: string;
	username: string;
	description: string;
	following: string;
	followers: string;
}

const HoverCardDemo = ({
	src,
	alt,
	initials,
	name,
	username,
	description,
	following,
	followers,
}: Props) => (
	<HoverCardPrimitive.Root>
		<HoverCardPrimitive.Trigger asChild>
			<a
				className="inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-white rounded-full ImageTrigger"
				href="https://twitter.com/royquilor"
				target="_blank"
				rel="noreferrer noopener"
			>
				<Avatar src={src} alt={alt} initials={initials} />
			</a>
		</HoverCardPrimitive.Trigger>
		<HoverCardPrimitive.Portal>
			<HoverCardPrimitive.Content
				align="center"
				sideOffset={4}
				className={cx(
					'HoverCardPrimitiveContent radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
					'w-72 rounded-lg p-4',
					'bg-white border border-slate-200 shadow-xl',
					'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="flex flex-col w-full gap-y-2">
					<div className="flex items-start justify-between">
						<Avatar src={src} alt={alt} initials={initials} />
						<div>
							<Button intent="outline" size="default">
								Following
							</Button>
						</div>
					</div>
					<UserCard
						name={name}
						username={username}
						description={description}
						following={following}
						followers={followers}
					/>
				</div>
			</HoverCardPrimitive.Content>
		</HoverCardPrimitive.Portal>
	</HoverCardPrimitive.Root>
);

export default HoverCardDemo;
