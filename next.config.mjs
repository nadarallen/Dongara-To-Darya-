/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Auto-convert to AVIF first, then WebP — much smaller than PNG
        formats: ['image/avif', 'image/webp'],

        // Cache optimized images for 30 days on CDN (default is 60s)
        minimumCacheTTL: 60 * 60 * 24 * 30,

        // Quality of compressed images (80 is visually lossless for most images)
        qualities: [75, 85, 100],

        // Responsive image breakpoints matching Tailwind's sm/md/lg/xl
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
};

export default nextConfig;
