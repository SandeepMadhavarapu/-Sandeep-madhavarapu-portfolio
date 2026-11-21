import {chromium} from '@playwright/test'
import {mkdirSync} from 'node:fs'
const base='https://sandeepmadhavarapu.github.io/-Sandeep-madhavarapu-portfolio/'
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))
const browser=await chromium.launch({args:['--disable-webgl']})
const results=[]
try{
 mkdirSync('live-proof',{recursive:true})
 for(const [label,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'})
  let verified=false,lastError=''
  for(let attempt=1;attempt<=12;attempt++){
   try{
    const response=await page.goto(base+'?release='+process.env.GITHUB_SHA,{waitUntil:'domcontentloaded',timeout:20000})
    if(!response||response.status()!==200)throw Error('HTTP status '+response?.status())
    await page.locator('.static-art').first().waitFor({state:'visible',timeout:10000})
    if(!(await page.locator('h1').innerText()).includes('Sandeep'))throw Error('Missing React heading')
    if(await page.locator('.static-art').count()!==4)throw Error('Expected four visible artifacts')
    verified=true;break
   }catch(error){lastError=String(error);console.log(label+' attempt '+attempt+' not ready: '+lastError.slice(0,200));await sleep(5000)}
  }
  if(!verified)throw Error('Live '+label+' site not ready: '+lastError)
  await page.screenshot({path:'live-proof/'+label+'.png',fullPage:true,animations:'disabled'})
  const assetCount=await page.evaluate(()=>performance.getEntriesByType('resource').filter(x=>x.name.includes('/assets/')&&x.name.endsWith('.js')).length)
  results.push({label,viewport:width+'x'+height,artifacts:4,jsResources:assetCount,liveUrl:base})
  await page.close()
 }
 console.log('Verified LIVE portfolio:',JSON.stringify(results))
}finally{await browser.close()}
