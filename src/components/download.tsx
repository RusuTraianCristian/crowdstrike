'use client';
import styles from './download.module.css';
import { useState } from 'react';
import Table from '../ui/table/table';
import { IRowData } from '../ui/table-row/tableRow';

// this [download] component would normally be a component used for a unique route/page
// we would likely fetch the data from an API or some other source
// then we'd feed that data (which we know by shape/interface) into the Table component
// but for the sake of the demonstration, we'll keep it simple

// assume we get this from an outside source
const initialData: IRowData[] = [
	{ name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
	{ name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
	{ name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
	{ name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
	{ name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' },
];

const Download: React.FC = () => {
	const [data] = useState<Array<IRowData>>(initialData || []);
	const [selectedRows, setSelectedRows] = useState<IRowData[]>([]);

	const handleCheckboxChange = (row: IRowData) => {
		setSelectedRows((prevSelectedRows) =>
			prevSelectedRows.includes(row)
			? prevSelectedRows.filter((r) => r !== row)
			: [ ...prevSelectedRows, row ]
		);
	};

	const handleSelectAllChange = () => {
		if (selectedRows.length === data.filter(row => row.status === 'available').length) {
			setSelectedRows([]);
		}
		else {
			setSelectedRows(data.filter(row => row.status === 'available'));
		}
	};

	const handleDownloadSelected = () => {
		if (selectedRows.length > 0) {
			const paths = selectedRows.map(row => `${ row.path } (${ row.device })`).join('\n');
			alert(`Downloading the following files:\n${ paths }`);
		}
	};

	return (
		<>
			<div className={ styles.downloadContentWrapper } data-testid='download-component'>
				<div className={ styles.downloadContentSection}>
					<Table
						data={ data }
						selectedRows={ selectedRows }
						onCheckboxChange={ handleCheckboxChange }
						onSelectAllChange={ handleSelectAllChange }
						onDownloadSelected={ handleDownloadSelected }
						selectItemOnRowClick={ true }
						aria-label='File Manager'
						aria-describedby='download-instructions'
					/>
				</div>
				<div className={ styles.downloadContentSection}>
					<h3>added some quality of life features:</h3>
					<p>select/deselect an item by clicking anywhere on a row</p>
					<p>loading state support</p>
					<h3>some other would be:</h3>
					<p>- custom row colors (or maybe 1 dark 1 light)</p>
					<p>- custom content within cells</p>
					<p>- pagination (or maybe infinite loading - debatable)</p>
					<p>- filtering/sorting</p>
					<p>- virtualization/lazy loading (for large datasets)</p>
					<p>- extract labels into a separate file and use i18n for translation (typically..)</p>
				</div>
			</div>
		</>
	);
};

export default Download;
