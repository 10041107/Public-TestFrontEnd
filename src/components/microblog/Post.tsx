import { ReactNode } from 'react';
import DropdownMenuDemo from './radix/DropdownMenu';
import HoverCardDemo from './radix/HoverCard';

import {
	HiArrowUpTray,
	HiOutlineArrowPath,
	HiOutlineChartBarSquare,
	HiOutlineChatBubbleOvalLeft,
	HiOutlineHeart,
} from 'react-icons/hi2';

interface Props {
	content: string;
	name: string;
	username: string;
	date: string;
	src: string;
	initials: string;
	followers: string;
	following: string;
	description: string;
	children?: ReactNode;
}

const Post = ({
	content,
	name,
	username,
	date,
	children,
	src,
	initials,
	followers,
	following,
	description,
	...props
}: Props) => (
	<div className="flex flex-col w-full col-span-3 gap-x-4 ">

		<div className="flex-shrink-0 ">
			<HoverCardDemo
				src={src}
				alt={name}
				initials={initials}
				name={name}
				username={username}
				following={following}
				followers={followers}
				description={description}
			/>
		</div>
		<div className="flex flex-col flex-1">
			<div className="flex flex-1">
				<div className="flex items-center flex-1 justify-left gap-x-1">
					<span className="text-lg font-bold text-gray-700">{name}</span>
					<span className="text-base font-medium text-gray-500">@{username}</span>·
					<span className="text-sm font-medium text-gray-400">{date}</span>
				</div>
				<div className="">
					<DropdownMenuDemo />
				</div>
			</div>
			<div className="mb-5 text-base text-gray-700">{content}</div>
			{children}
			<div>
				<ul className="flex gap-x-10 xl:gap-x-14 text-xs text-gray-700 [&_li:first-child]:hidden [&_li:first-child]:lg:flex [&_li]:flex [&_li]:items-center [&_li]:gap-x-2 [&_li:xl]:gap-x-3 ">
					<li className="">
						<HiOutlineChartBarSquare className="w-4 h-4" />
						20
					</li>
					<li>
						<HiOutlineChatBubbleOvalLeft className="w-4 h-4" />2
					</li>
					<li>
						<HiOutlineArrowPath className="w-4 h-4" />1
					</li>
					<li>
						<HiOutlineHeart className="w-4 h-4" />
						23
					</li>
					<li>
						<HiArrowUpTray className="w-4 h-4" />
					</li>
				</ul>
			</div>
		</div>
	</div>
);

export default Post;
