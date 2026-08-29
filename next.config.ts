import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 'standalone' es lo que usa el Dockerfile (copia .next/standalone y corre
  // `node server.js`). Vercel hace su propio bundling de funciones serverless
  // y este output choca con eso — falla con ENOENT en next-server.js.nft.json
  // si queda activado. Vercel expone `VERCEL=1` en su entorno de build, así
  // que se desactiva solo ahí.
  output: process.env.VERCEL ? undefined : 'standalone',
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
