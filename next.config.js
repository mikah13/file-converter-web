/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_API: process.env.BACKEND_API,

    },
    experimental: { esmExternals: 'loose' }
}

module.exports = nextConfig
