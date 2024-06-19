import { Context, createContext, useContext, useState } from 'react';
import { LocaleService } from '../../services/locale.service';

type TLocale = { value: string, label: string };
type TLocales = TLocale[];
type TChangeLocale = (newLocale: TLocale) => void;
type TTranslate = (path: string) => string;
type TTranslations = { [key: string]: any };

interface ILocaleHook {
	LocaleContext: Context<TTranslate>;
	locale: TLocale;
	locales: TLocales;
	changeLocale: TChangeLocale;
	translate: TTranslate;
	i18n: TTranslate;
};

const defaultTranslate: TTranslate = (path: string) => path;
const LocaleContext = createContext<TTranslate>(defaultTranslate);

export const useLocale = (): ILocaleHook => {
	const { getLocales, getTranslations } = LocaleService();
	const locales: TLocales = getLocales();
	const translations: TTranslations = getTranslations();

	const i18n = useContext(LocaleContext);
	const [locale, setLocale] = useState<TLocale>(locales[0]);

	const changeLocale: TChangeLocale = (newLocale: TLocale): void => {
		setLocale(newLocale);
	};

	const translate: TTranslate = (path: string): string => {
		const keys = path.split('.');
		let result = translations[locale.value];

		for (const key of keys) {
			result = result[key];

			if (result === undefined) {
				return path;
			}
		}

		if (typeof result === 'object' && result !== null) {
			return `Invalid key/path '${ path }' supplied, received object.`;
		}

		return result;
	};

	return {
		LocaleContext,
		locale,
		locales,
		changeLocale,
		translate,
		i18n,
	};
};
