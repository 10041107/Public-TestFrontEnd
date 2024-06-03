import Image from 'next/image';
import { ReactNode } from 'react';
import Button from './Button';
import ColoredButton from './ColoredButton';
import Avatar from './radix/Avatar';

interface PostItem {
	name: string;
	username: string;
	content: string;
	description: string;
	date: string;
	src: string;
	following: string;
	followers: string;
	initials: string;
	image?: ReactNode;
}

const items: PostItem[] = [
	{
		name: '문재인',
		username: 'janedoe',
		following: '249',
		followers: '663',
		content: 'Design and build templates',
		description:
			'Improve your design skills by making projects. 1 every week, practice with me on Youtube. I use Figma, Tailwind CSS and Webflow.',
		date: '1h',
		src: 'https://images.unsplash.com/photo-1715058010511-f3f9df841d4e?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0',
		initials: 'JD',
		image: (
			<div className="relative w-full mb-3 h-80">
				<Image
					fill={true}
					style={{ objectFit: 'cover' }}
					className="rounded-3xl"
					src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80"
					alt="Gradient"
				/>
			</div>
		),
	},
	{
		name: 'John Doe',
		username: 'johndoe',
		following: '138',
		followers: '2,218',
		content: 'I love Figma',
		description: 'I design and hug auto layout everyday',
		date: '2h',
		src: 'https://images.unsplash.com/photo-1532123675048-773bd75df1b4?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jessica Doe',
		username: 'jessicadoe',
		following: '866',
		followers: '1001',
		content: 'Tailwind CSS is insane',
		description:
			'Should designers code. Should you rename your Figma layers is the 1 billion…',
		date: '3h',
		src: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Joe Doe',
		username: 'joedoe',
		following: '668',
		followers: '1985',
		content: 'Next JS documentation is so good',
		description: 'Next JS enthusiast',
		date: '4h',
		src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jill Doe',
		username: 'jilldoe',
		following: '256',
		followers: '148',
		content: 'How to use custom fonts with Storybook',
		description: 'Sharing my journey on Storybook, Next JS and Tailwind CSS',
		date: '5h',
		src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jeff Doe',
		username: 'jeffdoe',
		following: '232',
		followers: '89',
		content: 'Why use Storybook?',
		description: 'Learning and building projects with Next JS',
		date: '6h',
		src: 'https://images.unsplash.com/photo-1642060603505-e716140d45d2?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jean Doe',
		username: 'jeandoe',
		following: '186',
		followers: '90',
		content: 'Vercel and Netlify are pretty cool',
		description: 'Radix UI Avenger',
		date: '7h',
		src: 'https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
	{
		name: 'Jack Doe',
		username: 'jackdoe',
		following: '56',
		followers: '24',
		content: 'Webflow community is awesome',
		description: 'Currently redesigning my portfolio for the 8th time today',
		date: '8h',
		src: '',
		initials: 'JD',
	},
	{
		name: 'Jenny Doe',
		username: 'jennydoe',
		following: '56',
		followers: '23',
		content: 'Radix UI is nice to integrate',
		description: 'Figma and Next JS aficionado',
		date: '9h',
		src: 'https://images.unsplash.com/photo-1597004897768-c503466472cc?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80',
		initials: 'JD',
	},
];

const Feed = () => {

	return (
    <div className="overflow-hidden bg-white border-2 rounded-lg border-neutral-200">
				<ul className="[&_p:last-child]:text-gray-500 [&_p:first-child]:text-lg divide-y divide-gray-200">
					{items.map(
						(
							{
								name,
								username,
								content,
								date,
								src,
								initials,
								image,
								following,
								followers,
								description,
							},
							i,
						) => (
							<li key={`username-${i}`} className="p-5">
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

							</li>
						),
					)}
				</ul>
		</div>
	);
}
export default Feed;

