import roTranslations from '../translations/ro.json';
import enTranslations from '../translations/en.json';

export const LocaleService = () => {
	return {
		getLocales,
		getTranslations,
	};
};

const getLocales = () => {
	const locales = [
		{
			value: 'română',
			label: 'română',
		},
		{
			value: 'english',
			label: 'english',
		},
	];

	return locales;
};

const getTranslations = () => {
	const translations = {
		'română': roTranslations,
		'english': enTranslations,
	};

	return translations;
};
