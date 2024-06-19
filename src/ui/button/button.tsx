/**
 * Button Component
 * A button component that supports various types, colors, sizes, styles, states and icons.

 * @param { string } type - The type of the button (primary, secondary, tertiary) defaults to [primary].
 * @param { string } size - The size of the button (small, medium, big) defaults to [medium].
 * @param { string } text - The (call to action) text to be rendered inside the button.
 * @param { boolean } onMouseOverAnimation - Whether the button should animate @ onMouseOver event -- defaults to [true].
 * @param { boolean } loading - A button loading state replacing everything rendered (text and/or iconLeft/iconRight) with a loading supplied icon -- defaults to [false].
 * @param { boolean } disabled - A button disabled state which changes the appearance to a 'faded/inactive' style and prevents onClick events from being fired -- defaults to [false].
 * @param { React.ReactNode } iconLeft - Displays a supplied icon to the left of the [text] defaults to [undefined].
 * @param { React.ReactNode } iconRight - Displays a supplied icon to the right of the [text] defaults to [undefined].
 * @param { () => void } onClick - A function to be executed when onClick event is fired defaults to [undefined].
*/

import React from 'react';
import styles from './button.module.css';

const defaultIconColor = '#000000';
const defaultIconSize = '24px';

export interface IIconProps {
	color?: string;
	size?: string;
};

export interface IButtonProps {
	type?: string;
	size?: string;
	text: string;
	onMouseOverAnimation?: boolean;
	loading?: boolean;
	disabled?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	onClick?: () => void;
};

export const IconSpinner: React.FC<IIconProps> = ({
	color = defaultIconColor,
	size = defaultIconSize,
}) => {
	return (
		<div>
			<svg className={ styles['svg'] } width={ size } height={ size } version='1.1' id='L9' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' enableBackground='new 0 0 0 0' xmlSpace='preserve'>
				<path fill={ color } d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'>
					<animateTransform
						attributeName='transform'
						attributeType='XML'
						type='rotate'
						dur='1s'
						from='0 50 50'
						to='360 50 50'
						repeatCount='indefinite'
					/>
				</path>
			</svg>
		</div>
	);
};

export const IconDownload: React.FC<IIconProps> = ({
	color = defaultIconColor,
	size = defaultIconSize,
}) => {
	return (
		<div>
			<svg className={ styles['svg'] } width={ size } height={ size } xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={ color }>
				<path d='M3 19H21V21H3V19ZM13 9H20L12 17L4 9H11V1H13V9Z' />
			</svg>
		</div>
	);
};

export const Button: React.FC<IButtonProps> = ({
	type = 'primary',
	size = 'medium',
	text,
	onMouseOverAnimation = true,
	loading = false,
	disabled = false,
	iconLeft = undefined,
	iconRight = undefined,
	onClick = () => { return; },
}) => {
	const buttonTypes = ['primary', 'secondary', 'tertiary'];
	const buttonSizes = ['small', 'medium', 'big'];
	const buttonType = buttonTypes.includes(type) ? type : 'primary';
	const buttonSize = buttonSizes.includes(size) ? size : 'medium';
	const buttonAnimation = (disabled || !onMouseOverAnimation) ? '' : 'animation';
	const disabledButtonClass = disabled ? 'disabledButton' : '';
	const buttonClass = `${ styles.button } ${ styles[buttonType] } ${ styles[buttonSize] } ${ styles[buttonAnimation] } ${ styles[disabledButtonClass] }`;
	const spinnerSize = buttonSize === 'big' ? 'calc(calc(66px / 3) * 2)' : buttonSize === 'medium' ? 'calc(calc(54px / 3) * 2)' : 'calc(calc(42px / 3) * 2)';
	const iconColor = disabled ? 'var(--cinder-dark)' : '#000000';
	const iconSize = buttonSize === 'big' ? '33px' : buttonSize === 'medium' ? '27px' : '21px';

	const handleClick = () => {
		if (!disabled && !loading) {
			onClick();
		}
	};

	return (
		<button
			className={ buttonClass }
			onClick={ handleClick }
			disabled={ disabled || loading }
			data-testid='button'
			tabIndex={ 0 }
		>
			{
				loading
					? <IconSpinner color={ iconColor } size={ spinnerSize } />
					: <>
						{ iconLeft && React.cloneElement(iconLeft as React.ReactElement, { color: iconColor, size: iconSize }) }
						{ text }
						{ iconRight && React.cloneElement(iconRight as React.ReactElement, { color: iconColor, size: iconSize }) }
					</>
			}
		</button>
	);
};

export default Button;
