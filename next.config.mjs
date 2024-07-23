/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    webpack:true,
    webpack:(config)=>{
        config.resolve.fallback={fs:false};
        return config;
    }
};

export default nextConfig;