/** @type {import('next').NextConfig} */
const nextConfig = {
  // Test sur iPhone via le réseau local : sans ça, le serveur dev bloque /_next et la page ne s'hydrate pas.
  allowedDevOrigins: ["192.168.1.33"],
  // Captures WebP importées en statique depuis src/assets : pas d'hôte distant à autoriser.
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 pour les captures (texte de l'interface net), 75 par défaut ailleurs.
    qualities: [75, 85],
    // Sources ≤ 2560 px : pas de variante 3840.
    deviceSizes: [640, 750, 828, 1080, 1280, 1640, 2048, 2560],
    imageSizes: [96, 160, 256, 384],
    // Imports statiques hachés : les variantes optimisées ne changent jamais.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
