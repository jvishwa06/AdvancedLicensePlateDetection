/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/predict',
          destination: 'http://backend:5000/predict',
        },
      ];
    },
  }
  
export default nextConfig;