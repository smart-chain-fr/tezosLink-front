/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	publicRuntimeConfig: {
		// Will be available on both server and client
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};

module.exports = nextConfig;

