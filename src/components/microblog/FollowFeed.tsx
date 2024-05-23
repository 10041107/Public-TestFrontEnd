import Image from 'next/image';
import { ReactNode } from 'react';
import Post from './Post';

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
		name: 'Jane Doe',
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
	}
];

const FollowFeed = () => {

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
								<Post
									name={name}
									username={username}
									content={content}
									date={date}
									src={src}
									initials={initials}
									description={description}
									followers={followers}
									following={following}
								>
									{image}
								</Post>
							</li>
						),
					)}
				</ul>
		</div>
	);
}

export default FollowFeed;
