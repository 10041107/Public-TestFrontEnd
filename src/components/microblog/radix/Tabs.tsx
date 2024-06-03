import * as TabsPrimitive from '@radix-ui/react-tabs';
import cx from 'classnames';
import { useState } from 'react';
import Feed from '../Feed';
import FollowFeed from '../FollowFeed';
import FollowList from '../FollowList';
import NothingFeed from '../NothingFeed';

const Tabs = () => {
  const [isFeedVisible, setIsFeedVisible] = useState(false); 
	const [isFollowAble, setisFollowAble] = useState(false); 

  return (
	<TabsPrimitive.Root className="TabsRoot" defaultValue="tab1">
		<TabsPrimitive.List
			className="flex w-full mt-3 bg-white border-2 rounded-lg border-b-gray-200"
			aria-label="Manage your account"
		>
			<TabsPrimitive.Trigger
				value="tab1"
				className={cx(
					'TabsTrigger group hover:bg-gray-200',
					'radix-state-active:bg-neutral-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-grey-100 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-700 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-7 text-lg font-bold',
					'focus:radix-state-active:border-b-grey',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="relative h-full py-4 ">
					<div>홈</div>
					<span className="absolute bottom-0 left-0 w-full h-1 bg-transparent rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>

			<TabsPrimitive.Trigger
				value="tab2"
				className={cx(
					'TabsTrigger group hover:bg-gray-200',
					'radix-state-active:bg-neutral-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-grey-100 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-700 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-7 text-lg font-bold',
					'focus:radix-state-active:border-b-grey',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="relative h-full py-4 ">
					<div>팔로우</div>
					<span className="absolute bottom-0 left-0 w-full h-1 bg-transparent rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>

			<TabsPrimitive.Trigger
				value="tab3"
				className={cx(
					'TabsTrigger group hover:bg-gray-200',
					'radix-state-active:bg-neutral-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-grey-100 dark:radix-state-active:border-b-gray-100 dark:radix-state-active:bg-gray-700 focus-visible:dark:radix-state-active:border-b-transparent dark:radix-state-inactive:bg-gray-800',
					'px-7 text-lg font-bold',
					'focus:radix-state-active:border-b-grey',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}
			>
				<div className="relative h-full py-4 ">
					<div>팔로우 목록</div>
					<span className="absolute bottom-0 left-0 w-full h-1 bg-transparent rounded-full"></span>
				</div>
			</TabsPrimitive.Trigger>


		</TabsPrimitive.List>

		
		<TabsPrimitive.Content value="tab1" className="TabsContent ">
			<Feed />
    </TabsPrimitive.Content>
		
		<TabsPrimitive.Content value="tab2" className="TabsContent ">
			 {isFeedVisible ? <FollowFeed /> : <NothingFeed />}
			{/* <TweetForm width="default" /> */}
		</TabsPrimitive.Content>

		<TabsPrimitive.Content value="tab3" className="TabsContent ">
			{isFollowAble ? <FollowList /> : <NothingFeed />}
		</TabsPrimitive.Content>
		
	</TabsPrimitive.Root>
);
}

export default Tabs;
