import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
	title: string;
	href: string;
	children: ReactNode;
}

const Panel = ({ title, href, children }: Props) => ( 
	<div className="mt-3 overflow-hidden bg-white border-2 rounded-lg border-neutral-200">
		<div className="flex items-center justify-between px-4 py-5 ">
			<h2 className="text-xl font-bold leading-none">{title}</h2>
		</div>
		{children}
		<div className="px-4 py-4">
			<Link className="font-medium text-mx" href={href}>
				Show more
			</Link>
		</div>
	</div>
);

export default Panel;
