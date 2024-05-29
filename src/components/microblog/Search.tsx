import { HiMagnifyingGlass } from 'react-icons/hi2';

const Search = () => (
	<div className="sticky top-0 mb-3 bg-white border-2 rounded-lg border-neutral-200">
		<form className="flex flex-col flex-1 gap-y-4">
			<div className="relative flex items-center flex-1 i">
				<HiMagnifyingGlass className="absolute flex items-center w-6 h-6 left-4 text-neutral-400" />
				<input
					type="검색"
					placeholder="검색"
					className="flex items-center w-full py-5 pr-4 text-base rounded-lg pl-14 placeholder:text-mx placeholder:font-medium border-neutral-100 placeholder:text-neutral-400"
				/>
				<button className="px-4 py-2 font-bold text-white rounded-full sr-only text-mx bg-neutral-700">
					Search
				</button>
			</div>
		</form>
	</div>
);

export default Search;
