/**
 * Dock Component
 * A header wrapper component that can be used to contain various types of content.

 * @param { boolean } smart - Whether the dock should apply smart positioning or stay fixed.
 * @param { boolean } contained - Whether the content inside the dock should be contained within a specific width.
 * @param { React.ReactNode } children - The content to be wrapped by the dock.
 * @param { string } ariaLabel - [Optional] A label for the dock for accessibility purposes.
*/

import { useState, useEffect } from 'react';
import styles from './dock.module.css';

export interface IDockProps {
	smart?: boolean;
	contained?: boolean;
	children?: React.ReactNode;
	ariaLabel?: string;
}

export const Dock: React.FC<IDockProps> = ({
	smart = true,
	contained = true,
	children = undefined,
	ariaLabel = 'header',
}) => {
	const [smartDockSettings, setSmartDockSettings] = useState<string>('0px');
	const containedDockSettings = { maxWidth: '1400px' };

	const applyDockStrategy = () => {
		let  threshold = 0;

		window.onscroll = (): void => {
			if (window.scrollY > (threshold + 70)) {
				threshold = window.scrollY;
				setSmartDockSettings('-70px');
			}
			else if (window.scrollY <= threshold) {
				threshold = window.scrollY;
				setSmartDockSettings('0px');
			}
			else if (window.scrollY === 0) {
				threshold = 0;
				setSmartDockSettings('0px');
			}
		};
	};

	useEffect(() => {
		applyDockStrategy();
	}, []);

	return (
		<header
			className={ styles.dock }
			style={ smart ? { top: smartDockSettings } : undefined }
			aria-label={ ariaLabel }
			data-testid='dock'
		>
			<div
				className={ styles.dockContainer }
				style={ contained ? { ...containedDockSettings } : undefined }
				data-testid='dock-container'
			>
				{ children }
			</div>
		</header>
	);
};

export default Dock;
