/**
 * @param { boolean } checked - Whether the checkbox is checked/unchecked.
 * @param { boolean } disabled - [Optional] Whether the checkbox is disabled.
 * @param { boolean } indeterminate - [Optional] An 'in-between' state to visually show whether all/none/some items are selected in a group -- defaults to [false].
 * @param { () => void } onChange - The callback to be invoked when a checkbox is checked.
 * @param { string } label - [Optional] The label to be displayed next to the checkbox.
*/

import { useEffect, useRef } from 'react';
import styles from './checkbox.module.css';

export interface ICheckboxProps {
	checked: boolean;
	disabled?: boolean;
	indeterminate?: boolean;
	onChange: () => void;
	label?: string;
};

const Checkbox: React.FC<ICheckboxProps> = ({
	checked,
	disabled = false,
	indeterminate = false,
	onChange,
	label = 'checkbox',
}) => {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.indeterminate = indeterminate;
		}
	}, [indeterminate]);

	return (
		<input
			className={ styles['checkbox'] }
			type='checkbox'
			data-testid='checkbox'
			checked={ checked }
			disabled={ disabled }
			onChange={ onChange }
			ref={ ref }
			aria-label={ label }
			aria-checked={ indeterminate ? 'mixed' : checked ? 'true' : 'false' }
		/>
	);
};

export default Checkbox;
