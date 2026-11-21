import {readFileSync,readdirSync,statSync} from 'node:fs'
import {join} from 'node:path'
import {gzipSync} from 'node:zlib'
const root='dist'
function walk(dir){return readdirSync(dir).flatMap(f=>{const p=join(dir,f);return statSync(p).isDirectory()?walk(p):[p]})}
const files=walk(root).filter(p=>/\.(js|css)$/.test(p))
const gz=Object.fromEntries(files.map(p=>[p,gzipSync(readFileSync(p)).length]))
const total=Object.values(gz).reduce((a,b)=>a+b,0)
const html=readFileSync(join(root,'index.html'),'utf8')
const assets=[...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)].map(x=>'dist/'+x[1].replace(/^\/-Sandeep-madhavarapu-portfolio\//,'').replace(/^\//,''))
const initial=assets.reduce((n,path)=>n+(gz[path]??0),0)
const k=n=>(n/1024).toFixed(1)+' KiB'
console.log('Static assets gzip total:',k(total),'(budget: 650 KiB)')
console.log('Initial script(s) gzip:',k(initial),'(budget: 230 KiB)')
for(const [name,bytes] of Object.entries(gz)) console.log(name,k(bytes))
if(!assets.length||assets.some(a=>!gz[a])){console.error('Missing generated JS entry point');process.exitCode=1}
if(initial>230*1024||total>650*1024){console.error('Bundle budget exceeded');process.exitCode=1}
