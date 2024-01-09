/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dlfsmyddxqmebxbgiyck.supabase.co",
            },
        ],
    },
};

module.exports = nextConfig;
