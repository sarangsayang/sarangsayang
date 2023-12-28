/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "placehold.co",
            "localhost",
        ]
    },
    transpilePackages: ['html-to-text']
}

module.exports = nextConfig
