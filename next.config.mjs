/** @type {import('next').NextConfig} */
const nextConfig = {
  // Toutes les images sont locales (public/screens) : pas d'hôte distant à autoriser.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
