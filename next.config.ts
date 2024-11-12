// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enable React Strict Mode
    reactStrictMode: true,

    // Custom Webpack configuration
    webpack: (config) => {
        // Example: Add a custom loader or plugin
        return config;
    },

    // Custom headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                ],
            },
        ];
    },

    // Other configuration options can go here
    // For example, you can set the base path, asset prefix, etc.
    // basePath: '/my-base-path',
    // assetPrefix: 'https://cdn.example.com',
};

export default nextConfig;
