import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
  manifest: {
    name: 'BeatTunes',
    short_name: 'BeatTunes',
    description: 'BeatTunes Music Player',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    background_color: '#353531',
    display: 'standalone',
    orientation: 'portrait',
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin),
  ],
  base: '/Beat-Tunes-MusicPlayer/', // Adjust base URL for deployment
  assetsInclude: ['**/*.mpeg', '**/*.PNG', '**/*.lottie'], // Include custom assets
});
