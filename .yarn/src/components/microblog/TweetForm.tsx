import Link from 'next/link';
import Avatar from './radix/Avatar';

import {
	RiChatPollLine,
	RiEmotionLine,
	RiFileGifLine,
	RiImage2Line,
	RiMapPin2Line,
} from 'react-icons/ri';

import { cva } from 'class-variance-authority';
import { useState } from 'react';

const TweetFormStyles = cva('flex flex-1 gap-x-2', {
	variants: {
		width: {
			default: 'p-4 border-b border-slate-200',
			full: '',
		},
	},
	defaultVariants: {
		width: 'default',
	},
});

function TweetForm({ width }: { width: 'default' | 'full' }) {
	const [input, setInput] = useState<string>('');
	return (
		<div className={TweetFormStyles({ width })}>
			<Avatar
				src="https://pbs.twimg.com/profile_images/1489998205236527108/q2REh8nW_400x400.jpg"
				alt="Roy Quilor"
				initials="RQ"
			/>
			<form className="flex flex-col flex-1 gap-y-4">
				<div className="flex flex-1">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="What's up?"
						className="w-full px-4 py-3 text-xl border-transparent appearance-none placeholder:text-slate-600 outline-0 focus:outline-none focus:ring-0 focus:border-transparent"
					/>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center px-4 gap-x-4">
						<Link href="/">
							<RiImage2Line className="w-5 h-5" />
							<span className="sr-only">Image</span>
						</Link>
						<Link href="/">
							<RiFileGifLine className="w-5 h-5" />
							<span className="sr-only">Gif</span>
						</Link>
						<Link href="/">
							<RiChatPollLine className="w-5 h-5" />
							<span className="sr-only">Poll</span>
						</Link>
						<Link href="/">
							<RiEmotionLine className="w-5 h-5" />
							<span className="sr-only">Emoji</span>
						</Link>
						<Link href="/">
							<RiMapPin2Line className="w-5 h-5" />
							<span className="sr-only">Tag location</span>
						</Link>
					</div>
					<div>
						<button
							disabled={!input}
							className="inline-flex items-center px-4 py-2 text-sm font-bold text-white transition-opacity duration-200 border border-transparent rounded-full bg-slate-700 disabled:opacity-50"
						>
							Tweet
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TweetForm;
