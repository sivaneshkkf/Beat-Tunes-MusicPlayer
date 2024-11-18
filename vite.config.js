import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "BeatTunes",
        short_name: "BeatTunes",
        description: "BeatTunes Music Player App",
        theme_color: "#1a1a18",
        background_color: "#1a1a18",
        display: "standalone",
        orientation: "portrait",
        start_url: "/Beat-Tunes-MusicPlayer/",
        base: "/Beat-Tunes-MusicPlayer/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshot1.png",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "screenshot2.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
  base: "/Beat-Tunes-MusicPlayer/",
  assetsInclude: ["**/*.mpeg", "**/*.PNG", "**/*.lottie"],
});
