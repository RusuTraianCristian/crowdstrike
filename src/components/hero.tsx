'use client';
import styles from './hero.module.css';
import { useLocale } from '../utils/hooks/useLocale';

const Hero: React.FC = () => {
	const { i18n } = useLocale();

	return (
		<>
			<div className={ styles.heroContentWrapper } data-testid='hero-component'>
				<div className={ styles.heroContentSection}>
					<h1>{ i18n('components.hero.title-primary') }</h1>
					<h2>{ i18n('components.hero.description-primary') }</h2>
				</div>
			</div>
		</>
	);
};

export default Hero;
