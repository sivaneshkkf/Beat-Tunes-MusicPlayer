import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'/Beat-Tunes-MusicPlayer/',
  assetsInclude: ["**/*.mpeg","**/*.PNG",'**/*.lottie'],
})
