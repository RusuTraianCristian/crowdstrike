/**
 * Table Component
 * 
 * Represents a table displaying software file data with interactive checkboxes for selection.
 * Includes dynamic generation of headers and rows based on provided data.
 *
 * Props:
 * @param { IRowData[] } data - Array of objects containing software file information, each object must have name, device, path, and status fields.
 * @param { IRowData[] } selectedRows - Array of selected rows from the table.
 * @param { (row: IRowData) => void } onCheckboxChange - Callback function invoked when a checkbox in a row is toggled.
 * @param { () => void } onSelectAllChange
 * @param { () => void } onDownloadSelected
 * @param { boolean } selectItemOnRowClick - [Optional] Whether to select a row when the row is clicked -- defaults to [false].
 * @param { boolean } loading - [Optional] Whether to show a loading spinner -- defaults to [false].
*/

import TableRow, { IRowData } from '../table-row/tableRow';
import Checkbox from '../checkbox/checkbox';
import Button, { IconDownload } from '../button/button';
import styles from './table.module.css';

export interface ITableProps {
	data: IRowData[];
	selectedRows: IRowData[];
	onCheckboxChange: (row: IRowData) => void;
	onSelectAllChange: () => void;
	onDownloadSelected: () => void;
	selectItemOnRowClick?: boolean;
	loading?: boolean;
};

const Table: React.FC<ITableProps> = ({
	data,
	selectedRows,
	onCheckboxChange,
	onSelectAllChange,
	onDownloadSelected,
	selectItemOnRowClick = false,
	loading = false,
}) => {
	const allAvailableSelected = data.every(
		row => row.status !== 'available' || selectedRows.includes(row)
	);
	const someAvailableSelected = data.some(
		row => row.status === 'available' && selectedRows.includes(row)
	);

	// dynamically generate the table headers based on the data
	const headers = Object.keys(data[0] as IRowData);
	const adjustedHeaders = [''].concat(headers);

	return (
		<table className={ styles['table'] } data-testid='table-component'>
			<caption>CrowdStrike File Manager</caption>
			{/* above caption should be added for accessibility purposes */}
			<thead>
				<tr className={ styles['tr'] }>
					<th className={ styles['th'] }>
						<Checkbox
							checked={ allAvailableSelected }
							indeterminate={ !allAvailableSelected && someAvailableSelected }
							onChange={ onSelectAllChange }
							aria-label='Select All'
							data-testid='table-select-all-checkbox'
						/>
					</th>
					<th className={ styles['th'] }>
						<span>
							{ selectedRows.length > 0 ? `Selected ${ selectedRows.length }` : 'None Selected' }
						</span>
					</th>
					<th className={ styles['th'] }>
						<Button
							text={ 'Download Selected' }
							onClick={ onDownloadSelected }
							disabled={ selectedRows.length === 0 }
							type='tertiary'
							size='small'
							data-testid='table-download-button'
							onMouseOverAnimation={ false }
							iconLeft={ <IconDownload /> }
						/>
					</th>
				</tr>
				<tr className={ styles['tr'] }>
					{
						adjustedHeaders.map((header: string) =>
							(<th
								key={ header }
								className={ styles['th'] }
							>
								{ header }
							</th>)
						)
					}
				</tr>
			</thead>
			<tbody>
				{
					loading
					? <tr>
						<td colSpan={ adjustedHeaders.length } className={ styles['td-loading'] }>
							Loading...
						</td>
					</tr>
					: data.map((row) =>
						(<TableRow
							key={ row.name }
							rowData={ row }
							onCheckboxChange={ onCheckboxChange }
							isSelected={ selectedRows.includes(row) }
							selectItemOnRowClick={ selectItemOnRowClick }
						/>)
					)
				}
			</tbody>
		</table>
	);
};

export default Table;
