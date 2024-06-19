import { NextFont } from 'next/dist/compiled/@next/font';
import { FontHelper } from '@/helpers/font.helper';

interface IFontHook {
	getInterFont: () => NextFont;
	getNotoFont: () => NextFont;
	getRobotoFont: () => NextFont;
};

export const useFont = (): IFontHook => {
	const { getInterFont, getNotoFont, getRobotoFont } = FontHelper();

	return {
		getInterFont,
		getNotoFont,
		getRobotoFont,
	};
};
