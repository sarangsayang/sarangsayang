/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "placehold.co",
            "localhost",
            "sarangsayang.up.railway.app"
        ]
    },
    transpilePackages: ['html-to-text']
}

module.exports = nextConfig
