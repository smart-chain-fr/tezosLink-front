/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL: process.env.NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL,
    NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL: process.env.NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL,
  },
}

module.exports = nextConfig
