/**
 * * TableRow Component
 * Represents a single row in a table displaying software file data.
 * Each row contains columns for name, device, path, status, and a checkbox for selection.
 *
 * Props:
 * @param { IRowData } rowData - Object containing data for the row, including name, device, path, and status.
 * @param { boolean } isSelected - Indicates whether the row is currently selected.
 * @param { (row: IRowData) => void } onCheckboxChange - Callback function invoked when the checkbox is toggled.
 * @param { boolean } selectItemOnRowClick - [Optional] Whether to select a row when the row is clicked -- defaults to [false].
*/

import Checkbox from '../checkbox/checkbox';
import styles from './table-row.module.css';

export interface IRowData {
	name: string;
	device: string;
	path: string;
	status: string;
};

export interface ITableRowProps {
	rowData: IRowData;
	isSelected: boolean;
	onCheckboxChange: (row: IRowData) => void;
	selectItemOnRowClick?: boolean;
};

const TableRow: React.FC<ITableRowProps> = ({
	rowData,
	isSelected,
	onCheckboxChange,
	selectItemOnRowClick = false,
}) => {
	const handleRowClick  = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.tagName !== 'INPUT' && rowData.status === 'available' && selectItemOnRowClick) {
			onCheckboxChange(rowData);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
		const target = event.target as HTMLElement;

		if (
			target.tagName !== 'INPUT'
			&& (event.key === 'Enter' || event.key === ' ')
			&& selectItemOnRowClick
			&& rowData.status === 'available'
		) {
			handleCheckboxChange();
			event.preventDefault();
		}
	};

	const handleCheckboxChange = () => {
		onCheckboxChange(rowData);
	};

	// dynamically generate the row values based on the data
	// this allows for flexibility in the data structure (supports rows with additional fields -- needs alteration of interface shape - optional fields, maybe?)
	const values = Object.values(rowData);

	const addStatusClass = (status: string): string => {
		const statusClass = styles['status-indicator'];
	
		switch (status) {
			case 'available':
				return `${ statusClass } ${ styles['status-available'] }`;
			// removed as it is not shown in the mockup
			// case 'scheduled':
			// 	return `${ statusClass } ${ styles['status-scheduled'] }`;
			default:
				return '';
		}
	};

	const tableRowClass = `
		${ styles['tr'] }
		${ isSelected ? styles['selected-row'] : '' }
	`;

	return (
		<tr
			className={ tableRowClass }
			onClick={ handleRowClick }
			onKeyDown={ handleKeyDown }
			tabIndex={ 0 }
		>
			<td
				className={ styles['td'] }
			>
				<Checkbox
					checked={ isSelected && rowData.status === 'available'}
					disabled={ rowData.status !== 'available' }
					onChange={ handleCheckboxChange }
					aria-label={ `Select ${ rowData.name }` }
				/>
			</td>
			{
				values.map((value: string, idx: number) =>
					(<td
						key={ idx }
						className={ `${ styles['td'] } ${ idx === 3 ? styles['status-column'] : '' }` }
					>
						{ idx === 3 && <span className={ addStatusClass(rowData.status) }></span> }
						{ value }
					</td>)
				)
			}
		</tr>
	);
};

export default TableRow;
