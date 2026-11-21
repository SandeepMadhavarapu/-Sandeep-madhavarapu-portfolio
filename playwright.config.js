import {defineConfig,devices} from '@playwright/test'
export default defineConfig({
 testDir:'./e2e',
 retries:process.env.CI?1:0,
 timeout:30000,
 use:{
  baseURL:'http://127.0.0.1:5173',
  trace:'retain-on-failure',
  screenshot:'only-on-failure',
  launchOptions:{args:['--disable-webgl']}
 },
 projects:[
  {name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900}}},
  {name:'mobile',use:{...devices['Desktop Chrome'],viewport:{width:390,height:844},isMobile:true,hasTouch:true}}
 ],
 webServer:{command:'npm run dev -- --host 127.0.0.1',url:'http://127.0.0.1:5173',reuseExistingServer:!process.env.CI,timeout:60000}
})
