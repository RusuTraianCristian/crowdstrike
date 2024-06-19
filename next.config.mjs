/** @type {import('next').NextConfig} */

import config from './env.config.mjs';

const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	trailingSlash: true,
	env: {
		...config.API_URLS,
		...config.APP_URLS,
		...config.PAGE_URLS,
	},
};

export default nextConfig;
