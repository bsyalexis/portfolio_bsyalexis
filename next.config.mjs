/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* AVIF d'abord : sur les photos pleine largeur il descend nettement plus
       bas que le WebP à qualité perçue égale, et le repli WebP couvre les
       navigateurs qui ne le décodent pas. */
    formats: ['image/avif', 'image/webp'],
    /* Largeurs de rendu demandées par les `sizes` des composants. Les valeurs
       par defaut de Next commencent a 640 : un telephone en 375 CSS px a
       DPR 2 reclame 750, un DPR 3 reclame 1125. Sans le palier 1125, Next
       sert 1200 et on paie 30 % de pixels pour rien. */
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1125, 1280, 1600, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 320, 384],
    /* Un an : les fichiers de public/ sont immuables, seul leur nom change. */
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
