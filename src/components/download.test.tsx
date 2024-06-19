import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Download from './download';

describe('Download component', () => {
	it('renders without crashing', () => {
		render(<Download />);
	});

	it('displays three instances of Table component', () => {
		const { getAllByTestId } = render(<Download />);
		const tables = getAllByTestId('table-component');
		expect(tables.length).toBe(1);
	});

	it('selects rows on checkbox change', async () => {
		const { getAllByTestId } = render(<Download />);
		const checkboxOne = getAllByTestId('checkbox')[1];
		const checkboxTwo = getAllByTestId('checkbox')[2];

		fireEvent.click(checkboxOne);
		fireEvent.click(checkboxTwo);

		await waitFor(() => {
			expect(checkboxOne).toBeChecked;
		});

		await waitFor(() => {
			expect(checkboxTwo).not.toBeChecked;
		});
	});

	it('downloads selected rows', async () => {
		const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
		const { getAllByRole } = render(<Download />);
		const checkboxTwo = getAllByRole('checkbox')[2];
		const checkboxThree = getAllByRole('checkbox')[3];
	
		fireEvent.click(checkboxTwo);
		fireEvent.click(checkboxThree);
	
		const downloadButton = getAllByRole('button').find(btn => btn.textContent === 'Download Selected');
	
		if (downloadButton) {
			fireEvent.click(downloadButton);

			const expectedMessage =
				`Downloading the following files:\n` +
				`\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe (Targaryen)\n` +
				`\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll (Lannister)`;
	
			await waitFor(() => {
				expect(mockAlert).toHaveBeenCalledTimes(1);
				expect(mockAlert).toHaveBeenCalledWith(expectedMessage);
			});
		}
		else {
			throw new Error('Download Selected button not found');
		}
	});
});
