/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**', 
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**', 
            }
        ],
    },

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals = config.externals || [];
            config.externals.push({
            "ssh2": "commonjs ssh2",
            "sshcrypto.node": "commonjs sshcrypto.node"
            });
        }

        return config;
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "X-Frame-Options",
              value: "ALLOWALL", 
            },
            {
              key: "Content-Security-Policy",
              value: "frame-ancestors 'self' http://localhost:3000", 
            },
          ],
        },
      ];
    },
    
};

export default nextConfig;
