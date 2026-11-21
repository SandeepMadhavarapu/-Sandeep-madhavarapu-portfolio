import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
 plugins:[react()],
 root:'app',
 publicDir:'../public',
 base:process.env.GITHUB_PAGES==='true'?'/-Sandeep-madhavarapu-portfolio/':'/',
 build:{outDir:'../dist',assetsDir:'assets',emptyOutDir:true,sourcemap:false,cssCodeSplit:true},
 test:{environment:'node',include:['app/src/**/*.test.js']}
})
