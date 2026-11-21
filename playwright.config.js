import {defineConfig,devices} from '@playwright/test'
export default defineConfig({
 testDir:'./e2e',
 retries:process.env.CI?1:0,
 timeout:45000,
 use:{baseURL:'http://127.0.0.1:5173',trace:'retain-on-failure',screenshot:'only-on-failure'},
 projects:[
  {name:'desktop-fallback',testIgnore:'**/scene.spec.js',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900},launchOptions:{args:['--disable-webgl']}}},
  {name:'mobile-fallback',testIgnore:'**/scene.spec.js',use:{...devices['Desktop Chrome'],viewport:{width:390,height:844},isMobile:true,hasTouch:true,launchOptions:{args:['--disable-webgl']}}},
  {name:'webgl-software',testMatch:'**/scene.spec.js',use:{...devices['Desktop Chrome'],viewport:{width:1440,height:900},launchOptions:{args:['--enable-webgl','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader']}}}
 ],
 webServer:{command:'npm run dev -- --host 127.0.0.1',url:'http://127.0.0.1:5173',reuseExistingServer:!process.env.CI,timeout:60000}
})
