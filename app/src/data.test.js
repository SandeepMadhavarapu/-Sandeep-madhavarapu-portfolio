import {describe,it,expect} from 'vitest'
import {PROJECTS,findProject} from './data.js'
describe('portfolio evidence',()=>{
it('includes four distinct artifacts and verified repository formats',()=>{expect(PROJECTS).toHaveLength(4);expect(new Set(PROJECTS.map(x=>x.id)).size).toBe(4);for(const p of PROJECTS){expect(p.repo).toMatch(/^https:\/\/github\.com\/SandeepMadhavarapu\//);expect(p.engineering.length).toBeGreaterThanOrEqual(3);expect(p.tradeoff.length).toBeGreaterThan(30)}})
it('handles invalid exhibit IDs',()=>{expect(findProject('unknown')).toBeNull();expect(findProject('aac').project).toBe('GPU-AAC Lab')})
})
