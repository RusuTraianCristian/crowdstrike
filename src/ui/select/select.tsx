/**
 * Select Component
 * A select component that requires an array of options and an onChange event function.

 * @param { string } type - The type of the select (primary, secondary, tertiary) defaults to [primary].
 * @param { string } size - The size of the select (small, medium, big) defaults to [medium].
 * @param { ISelectOptionProps } value - The initial selected value.
 * @param { ISelectOptionProps[] } options - An array of available options.
 * @param { boolean } disabled - A select disabled state which changes the appearance to a 'faded/inactive' style and prevents opening the list of options and the onChange event -- defaults to [false].
 * @param { React.ReactNode } iconLeft - Displays a supplied icon to the left of the [value] defaults to [undefined].
 * @param { React.ReactNode } iconRight - Displays a supplied icon to the right of the [value] defaults to [undefined].
 * @param { (option: ISelectOptionProps) => void } onChange - The callback to be invoked when a new option is selected.
*/

import React, { useState, useRef, useEffect } from 'react';
import styles from './select.module.css';

export interface ISelectOptionProps {
	value: string;
	label: string;
}

export interface ISelectProps {
	type?: string;
	size?: string;
	value: ISelectOptionProps;
	options: Array<ISelectOptionProps>;
	disabled?: boolean;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	onChange: (option: ISelectOptionProps) => void;
}

export const Select: React.FC<ISelectProps> = ({
	type = 'primary',
	size = 'medium',
	value,
	options,
	disabled = false,
	iconLeft = undefined,
	iconRight = undefined,
	onChange,
}) => {
	const selectTypes = ['primary', 'secondary', 'tertiary'];
	const selectSizes = ['small', 'medium', 'big'];
	const selectType = selectTypes.includes(type) ? type : 'primary';
	const selectSize = selectSizes.includes(size) ? size : 'medium';
	const selectWrapperType = `${ selectType }-wrapper`;
	const selectWrapperSize = `${ selectSize }-wrapper`;
	const selectContainerType = `${ selectType }-container`;
	const selectContainerSize = `${ selectSize }-container`;
	const selectDropdownType = `${ selectType }-dropdown`;
	const selectDropdownSize = `${ selectSize }-dropdown`;
	const disabledSelectClass = disabled ? 'disabledSelect' : '';
	const selectWrapperClass = `${ styles.selectWrapper } ${ styles[selectWrapperType] } ${ styles[selectWrapperSize] } ${ styles[disabledSelectClass] }`;
	const selectContainerClass = `${ styles.selectContainer } ${ styles[selectContainerType] } ${ styles[selectContainerSize] }`;
	const selectDropdownClass = `${ styles.selectDropdown } ${ styles[selectDropdownType] } ${ styles[selectDropdownSize] }`;
	const iconColor = disabled ? 'var(--cinder-dark)' : '#000000';
	const iconSize = selectSize === 'big' ? '33px' : selectSize === 'medium' ? '27px' : '21px';
	const tabIndex = disabled ? undefined : 0;

	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleToggleDropdown = () => {
		if (!disabled) {
			containerRef.current?.focus();
			setDropdownVisible(!dropdownVisible);
		}
	};

	const handleSelectOption = (option: ISelectOptionProps) => {
		if (!disabled) {
			setDropdownVisible(false);
			onChange(option);
		}
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setDropdownVisible(false);
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setDropdownVisible(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	return (
		<div
			className={ selectWrapperClass }
			ref={ wrapperRef }
			aria-label='Select dropdown menu'
			data-testid='select-wrapper'
		>
			<div
				className={ selectContainerClass }
				onClick={ handleToggleDropdown }
				ref={ containerRef }
				tabIndex={ tabIndex }
				// aria-expanded={ dropdownVisible }
				data-testid='select-container'
			>
				{
					<>
						{ iconLeft && React.cloneElement(iconLeft as React.ReactElement, { color: iconColor, size: iconSize }) }
						{ value.value }
						{ iconRight && React.cloneElement(iconRight as React.ReactElement, { color: iconColor, size: iconSize }) }
					</>
				}
			</div>
			{
				dropdownVisible &&
				(
					<div
						className={ selectDropdownClass }
						aria-label='Select dropdown menu list'
						data-testid='select-dropdown'
					>
						{
							options.map((option: ISelectOptionProps) => (
								<div
									onClick={ () => handleSelectOption(option) }
									key={ option.value }
									aria-label='Select dropdown menu option'
								>
									{ option.label }
								</div>
							))
						}
					</div>
				)
			}
		</div>
	);
};

export default Select;
