import { Inter, Noto_Sans, Roboto } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const noto = Noto_Sans({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin'], weight: '900' });

export const FontHelper = () => {
	return {
		getInterFont,
		getNotoFont,
		getRobotoFont,
	};
};

const getInterFont = () => {
	return inter;
};

const getNotoFont = () => {
	return noto;
};

const getRobotoFont = () => {
	return roboto;
};
