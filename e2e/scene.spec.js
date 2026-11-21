import {test,expect} from '@playwright/test'
import {mkdirSync} from 'node:fs'

test('WebGL museum renders and X-ray mode focuses artifacts', async ({page})=>{
 const errors=[]
 page.on('pageerror',e=>errors.push(e.message))
 await page.goto('/')
 const canWebgl=await page.evaluate(()=>!!document.createElement('canvas').getContext('webgl2'))
 expect(canWebgl,'Chromium software WebGL must be enabled for this test').toBe(true)
 await expect(page.locator('.stage canvas')).toBeVisible({timeout:35000})
 await expect(page.locator('.stage-caption')).toContainText('REAL-TIME 3D',{timeout:35000})
 const canvas=page.locator('.stage canvas')
 const box=await canvas.boundingBox()
 expect(box?.width).toBeGreaterThan(500)
 expect(box?.height).toBeGreaterThan(250)
 mkdirSync('test-results/screenshots',{recursive:true})
 await page.screenshot({path:'test-results/screenshots/webgl-scene.png',fullPage:false,animations:'disabled'})
 const toggle=page.getByRole('button',{name:/ACTIVATE X-RAY MODE/})
 await expect(toggle).toBeEnabled()
 await toggle.click()
 await expect(page.getByRole('button',{name:/RETURN TO MATERIAL VIEW/})).toHaveAttribute('aria-pressed','true')
 await page.locator('.selection button').nth(1).click()
 await expect(page.locator('.dossier')).toContainText('GPU-AAC Lab')
 await page.waitForTimeout(900)
 await page.screenshot({path:'test-results/screenshots/webgl-xray-focus.png',fullPage:false,animations:'disabled'})
 expect(errors,'No uncaught browser errors').toEqual([])
})
