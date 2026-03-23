import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permet de servir les images uploadées localement (/public/posters/)
    // sans passer par l'optimiseur Next.js qui bloque les fichiers locaux dynamiques.
    unoptimized: true,
  },
};

export default nextConfig;
