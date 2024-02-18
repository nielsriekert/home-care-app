import { MouseEventHandler } from 'react';

export default function ConditionalButton({
	onClick,
	children,
	...props
}: {
	onClick?: MouseEventHandler<HTMLButtonElement>,
	children: React.ReactNode,
	[x:string]: any;
}) {
	return onClick ?
		<button onClick={onClick} {...props}>{children}</button> :
		<div {...props}>{children}</div>;
};