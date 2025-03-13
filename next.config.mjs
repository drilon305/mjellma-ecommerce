/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
        { protocol: "https", hostname: "utfs.io" },
        { protocol: 'https', hostname: '8hvwzutv90.ufs.sh'}
      ],
    },
  }
  
  export default nextConfig