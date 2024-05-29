import Link from 'next/link';

const Footer = () => (
	<div className="flex flex-wrap px-4 py-4 mb-3 text-xs text-gray-100 gap-x-3 gap-y-2">
		<Link className="" href="/">
			서비스 이용약관
		</Link>
		<Link className="" href="/">
			Privacy Policy
		</Link>
		<Link className="" href="/">
			Cookie Policy
		</Link>
		<Link className="" href="/">
			Accessibility
		</Link>
		<Link className="" href="/">
			Ads info
		</Link>
		<Link className="" href="/">
			More
		</Link>
		<div className="">© 2023</div>
	</div>
);

export default Footer;
