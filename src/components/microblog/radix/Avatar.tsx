import * as AvatarPrimitive from '@radix-ui/react-avatar';

const AvatarDemo = ({
	src,
	alt,
	initials,
}: {
	src: string;
	alt: string;
	initials: string;
}) => (
	<AvatarPrimitive.Root className="inline-flex items-center justify-center overflow-hidden bg-gray-600 w-14 h-14 rounded-xl AvatarRoot">
		<AvatarPrimitive.Image
			className="object-cover AvatarImage w-100 h-100"
			src={src}
			alt={alt}
		/>
		<AvatarPrimitive.Fallback
			className="flex items-center justify-center text-base font-semibold leading-none text-white AvatarFallback w-100 h-100"
			delayMs={600}
		>
			{initials}
		</AvatarPrimitive.Fallback>
	</AvatarPrimitive.Root>
);

export default AvatarDemo;
