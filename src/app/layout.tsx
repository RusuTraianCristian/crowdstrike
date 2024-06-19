'use client';
import '@/styles/globals.css';
import styles from './layout.module.css';
import Dock from '@/ui/dock/dock';
import Select from '@/ui/select/select';
import { useLocale } from '@/utils/hooks/useLocale';
import { useFont } from '@/utils/hooks/useFont';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	const { getInterFont } = useFont();
	const interFont = getInterFont();
	const { LocaleContext, locale, locales, changeLocale, translate } = useLocale();

	return (
		<LocaleContext.Provider value={ translate }>
			<html lang='en'>
				<head>
					<title>CrowdStrike Home Assignment - Rusu Traian Cristian</title>
					<meta name='description' content='CrowdStrike Home Assignment'></meta>
				</head>
				<body className={ interFont.className }>
					<>
						<Dock>
							<div className={ styles['dock-content-wrapper'] }>
								<div className={ styles['dock-content-section'] }>
									<div>CrowdStrike</div>
									<div>/RusuTraianCristian</div>
								</div>
								<div className={ styles['dock-content-section'] }>
									<div className={ styles['dock-content-section-select-wrapper'] }>
										<Select
											size={ 'small' }
											value={ locale }
											options={ locales }
											onChange={ changeLocale }
										/>
									</div>
								</div>
							</div>
						</Dock>
						<div className={ styles['main-content-wrapper'] }>
							{ children }
						</div>
					</>
				</body>
			</html>
		</LocaleContext.Provider>
	);
};

export default RootLayout;
