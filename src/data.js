export const PROJECTS = [
  { id:'zuri', index:'01', artifact:'The Ledger', project:'Zuri Connect Africa', domain:'FINANCIAL SYSTEMS', category:'Systems',
    short:'An M-PESA-style financial platform focused on the controls behind a trustworthy transaction.',
    question:'What happens after someone presses Pay?',
    details:'Server-authoritative payment flows, idempotent operations, a tamper-evident double-entry ledger, and graph-based fraud signals.',
    engineering:['Payment initiation and webhook handling through Supabase Edge Functions','Atomic ledger posting and replay-safe reconciliation','WebAuthn authentication, step-up checks, and risk scoring'],
    tradeoff:'A production-oriented prototype with staging/placeholder credentials. It is not a licensed service moving real money.',
    stack:['React','Supabase','Postgres','WebAuthn'],repo:'https://github.com/SandeepMadhavarapu/zuri-connect-africa',demo:null,color:'#94ead2'},
  { id:'aac', index:'02', artifact:'The Oscillator', project:'GPU-AAC Lab', domain:'PARALLEL COMPUTING', category:'Research',
    short:'A PyTorch experiment investigating which parts of audio encoding benefit from GPU parallelism.',
    question:'Can an audio codec become a parallel machine?',
    details:'Batched MDCT transforms, quantization at candidate gains, and prefix-sum bit packing with a deliberately sequential bit-reservoir decision.',
    engineering:['Batched FFT-based MDCT across streams and frames','Concurrent trial quantization; sequential reservoir selection','Reference-comparison tests and documented CPU benchmarks'],
    tradeoff:'Research prototype, not a standards-compliant AAC encoder. GPU speedups have not yet been established.',
    stack:['Python','PyTorch','FFT','Performance'],repo:'https://github.com/SandeepMadhavarapu/AAC',demo:null,color:'#a2c8ff'},
  { id:'oracle', index:'03', artifact:'The Oracle', project:'WorldCup Oracle', domain:'PROBABILITY & SIMULATION', category:'AI & Data',
    short:'A football prediction engine that makes its uncertainty visible instead of pretending to know the future.',
    question:'How do you make uncertainty inspectable?',
    details:'Elo-style ratings, Poisson match models, Monte Carlo simulations and probability calibration in an end-to-end web product.',
    engineering:['Model-based match probabilities and score distributions','48-team tournament simulation and knockout logic','TypeScript validation, tests, and live calibration surfaces'],
    tradeoff:'Probabilities are estimates, not guarantees; results depend on source data and model assumptions.',
    stack:['Next.js','TypeScript','Monte Carlo','Vitest'],repo:'https://github.com/SandeepMadhavarapu/worldcup-oracle',demo:'https://worldcup-oracle-ecru.vercel.app',color:'#e6c08c'},
  { id:'pathwise', index:'04', artifact:'The Compass', project:'PathWise', domain:'EXPLAINABLE RULE ENGINES', category:'Systems',
    short:'A policy reasoning prototype that cites its rules and knows when the evidence is insufficient.',
    question:'Can a rule engine say “I don’t know”?',
    details:'Deterministic checks over dated rule packs with evidence, traceability, and explicit unknown states.',
    engineering:['Cited and dated deterministic rule packs','Explainable decisions and transparent missing-evidence states','Typed full-stack implementation with human-readable outputs'],
    tradeoff:'Prototype guidance tool; it does not replace official university or immigration advice.',
    stack:['Next.js','Rules','TypeScript','Evidence'],repo:'https://github.com/SandeepMadhavarapu/PathWise',demo:null,color:'#c5b0ff'}
];
export const ADDITIONAL = [
 {name:'Immigrant Hall of Honor',category:'Verification & storytelling',url:'https://github.com/SandeepMadhavarapu/ihh-proof-of-arrival'},
 {name:'TechVideos',category:'Creative automation',url:'https://github.com/SandeepMadhavarapu/TechVideos'}
];
export function findProject(id){return PROJECTS.find(p=>p.id===id)||null}
