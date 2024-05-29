import Link from 'next/link';
import Avatar from './radix/Avatar';

import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

const AccountNavItem = () => (
	<div className="flex items-center flex-1 px-4 py-8 m-5 gap-x-2">
		<div className="flex items-center flex-1 gap-x-3">
			<div className="flex justify-center flex-1 xl:flex-none xl:justify-start">
				<Avatar
					src="https://pbs.twimg.com/profile_images/1489998205236527108/q2REh8nW_400x400.jpg"
					alt="Roy Quilor"
					initials="RQ"
				/>
			</div>
			<div className="flex-col hidden xl:flex ">
				<p className="text-base font-semibold">Roy Quilor</p>
				<p className="text-sm font-medium text-neutral-600">@RoyQuilor</p>
			</div>
		</div>
		<div className="hidden xl:flex">
			<Link href="/">
				<HiOutlineEllipsisHorizontal className="w-6 h-6" />
			</Link>
		</div>
	</div>
);

export default AccountNavItem;
