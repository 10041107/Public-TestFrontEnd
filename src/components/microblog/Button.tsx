import { cva } from 'class-variance-authority';

interface Props {
	children: React.ReactNode;
	intent?: 'primary' | 'outline';
	size?: 'default' | 'small' | 'large';
}

const ButtonStyles = cva(
	' inline-flex items-center rounded-xl border',
	{
		variants: {
			intent: {
				primary: 'bg-gray-400 text-white border-transparent hover:bg-gray-500',
				outline: 'bg-transparent text-gray-400 border-gray-200',
			},
			size: {
				default: 'px-7 py-2 text-ml',
				small: 'px-7 py-1 text-ml',
				large: 'px-6 xl:px-20 py-3 text-lx',
			},
		},
		defaultVariants: {
			intent: 'primary',
			size: 'default',
		},
	},
);


const Button = ({ children, intent, size, ...props }: Props) => (
	<button className={ButtonStyles({ intent, size })}>{children}</button>
);

export default Button;
