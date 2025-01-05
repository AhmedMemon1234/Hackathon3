/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disable strict mode
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during builds
    },
    typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors during builds
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
};

export default nextConfig;
