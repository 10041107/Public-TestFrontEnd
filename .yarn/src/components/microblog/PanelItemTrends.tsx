import Link from 'next/link';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';

interface Props {
	category: string;
	title: string;
	stat: string;
}

const PanelItemTrends = ({ category, title, stat }: Props) => (
	<div className="flex items-center flex-1 px-4 py-2 gap-x-2 hover:bg-neutral-200">
		<div className="flex flex-col flex-1 gap-y-0.5 gap-x-2">
			<p className="text-sm font-medium text-neutral-700">
				{category}
			</p>
			<p className="font-bold text-mx text-neutral-700">{title}</p>
			<p className="text-sm font-medium text-neutral-500">{stat} View</p>
		</div>
		<div className="">
			<Link href="/">
				<HiOutlineEllipsisHorizontal className="w-6 h-6" />
			</Link>
		</div>
	</div>
);

export default PanelItemTrends;
