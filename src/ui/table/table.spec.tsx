import { render, fireEvent, waitFor } from '@testing-library/react';
import Table from './table';
import { IRowData } from '../table-row/tableRow';

const testData: IRowData[] = [
	{ name: 'smss.exe', device: 'Stark', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' },
	{ name: 'netsh.exe', device: 'Targaryen', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
	{ name: 'uxtheme.dll', device: 'Lannister', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available' },
	{ name: 'cryptbase.dll', device: 'Martell', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled' },
	{ name: '7za.exe', device: 'Baratheon', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled' },
];

const onCheckboxChangeMock = jest.fn();
const onSelectAllChangeMock = jest.fn();
const onDownloadSelectedMock = jest.fn();

describe('Table component', () => {
	it('renders without crashing', () => {
		render(
			<Table
				data={testData}
				selectedRows={[]}
				onCheckboxChange={onCheckboxChangeMock}
				onSelectAllChange={onSelectAllChangeMock}
				onDownloadSelected={onDownloadSelectedMock}
			/>
		);
	});

	it('selects rows on checkbox change', async () => {
		const { getAllByRole } = render(
			<Table
				data={testData}
				selectedRows={[]}
				onCheckboxChange={onCheckboxChangeMock}
				onSelectAllChange={onSelectAllChangeMock}
				onDownloadSelected={onDownloadSelectedMock}
			/>
		);

		const checkboxes = getAllByRole('checkbox');
		fireEvent.click(checkboxes[2]);

		await waitFor(() => {
			expect(onCheckboxChangeMock).toHaveBeenCalledWith(testData[1]);
		});
	});
});
