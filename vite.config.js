import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins:[react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/-Sandeep-madhavarapu-portfolio/' : '/',
  build:{outDir:'dist',assetsDir:'assets',sourcemap:false},
  test:{environment:'node',include:['src/**/*.test.js']}
})
