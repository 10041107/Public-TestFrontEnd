const Header = ({ title }: { title: string }) => (
	<div className="sticky top-0 z-10 bg-white/45 backdrop-blur-md">
		<div className="flex items-center justify-between px-4 py-5 border-2 rounded-lg">
			<div>

				<h2 className="text-lg font-bold">{title}</h2>
			</div>
		</div>
	</div>
);

export default Header;
