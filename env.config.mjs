const API_URLS = {
	development: {},
	staging: {},
	production: {},
};

const APP_URLS = {
	development: {},
	staging: {},
	production: {},
};

const PAGE_URLS = {
	development: {},
	staging: {},
	production: {},
};

const environment = process.env.APP_ENV || 'development';

const config = {
	API_URLS: API_URLS[environment],
	APP_URLS: APP_URLS[environment],
	PAGE_URLS: PAGE_URLS[environment],
};

export default config;
