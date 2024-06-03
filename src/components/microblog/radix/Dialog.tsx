import * as DialogPrimitive from '@radix-ui/react-dialog';
import { HiOutlinePencil, HiOutlineXMark } from 'react-icons/hi2';
import Button from '../Button';
import TweetForm from '../TweetForm';

const DialogDemo = () => (
	<DialogPrimitive.Root>
		<DialogPrimitive.Trigger asChild>
			<div className="flex justify-center w-full mt-5 appearance-none xl:justify-start">
				<Button size="large">
					<HiOutlinePencil className="w-6 h-6 xl:hidden" />
					<span className="hidden xl:flex">Tweet</span>
				</Button>
			</div>
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="fixed inset-0 z-30 DialogOverlay bg-gray-700/50" />
			<DialogPrimitive.Content className="DialogContent bg-white px-4 pt-4 pb-6 -translate-x-2/4 -translate-y-2/4 rounded-2xl shadow-xl fixed z-40 top-1/2 left-1/2 w-[90vw] max-w-lg max-h-[85vh] focus:outline-none">
				<DialogPrimitive.Close asChild className="mb-4">
					<button
						className="rounded-full IconButton hover:bg-gray-200"
						aria-label="Close"
					>
						<HiOutlineXMark className="w-5 h-5" />
					</button>
				</DialogPrimitive.Close>
				<DialogPrimitive.Title className="sr-only DialogTitle">
					Tweet
				</DialogPrimitive.Title>
				<DialogPrimitive.Description className="sr-only DialogDescription">
					Make a Tweet
				</DialogPrimitive.Description>

				<TweetForm width="full" />

				{/* <DialogPrimitive.Close asChild>
          <button className="Button green">Save changes</button>
        </DialogPrimitive.Close> */}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	</DialogPrimitive.Root>
);

export default DialogDemo;
