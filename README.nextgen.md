# Inventor's Museum — R3F feature branch

Separate React, Three.js and React Three Fiber rebuild. This branch is not merged or published to the existing GitHub Pages site. The previous website remains on main.

## Develop
Node 22+, then npm install, npm run dev, npm run check.
To verify GitHub Pages path: GITHUB_PAGES=true npm run build.

## Experience
- Procedurally modeled 3D room, brass vault, oscillator, celestial globe, compass.
- Cinematic camera focusing on selected exhibits, with real wireframe X-ray mode.
- Reduced-motion, small-screen, save-data and WebGL-free fallbacks use an accessible static gallery.
- Source-linked evidence dossiers with limitations.
- Keyboard shortcuts 1–4 select exhibits and Escape closes the dossier.

## Gate before merging
GitHub Actions tests and Vite build, browser screenshots at 375/768/1440, interaction tests, keyboard navigation, WebGL device fallback, performance and accessibility audit. A GitHub Pages deployment workflow still needs a production-ready migration once approved; do not merge or replace the live page until the review is complete.
