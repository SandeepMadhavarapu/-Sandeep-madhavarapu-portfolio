import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

const GOLD='#d6ab72', DARK='#121b25', GLASS='#8cead8'

function Metal({ color=GOLD, xray=false, ...props }){
 return <meshStandardMaterial color={xray?'#63e1dd':color} metalness={xray?.2:.78} roughness={xray?.12:.28} wireframe={xray} transparent={xray} opacity={xray?.83:1} {...props}/>
}
function Ring({radius=1,tube=.025,rotation=[0,0,0],xray=false,color=GOLD,position=[0,0,0]}){
 return <mesh rotation={rotation} position={position}><torusGeometry args={[radius,tube,8,96]}/><Metal xray={xray} color={color}/></mesh>
}
function Vault({xray}){
 return <group>
 <mesh position={[0,0,0]}><boxGeometry args={[1.45,1.66,.76]}/><Metal color="#57626b" xray={xray}/></mesh>
 <mesh position={[0,0,.403]}><boxGeometry args={[1.24,1.45,.05]}/><Metal color={DARK} xray={xray}/></mesh>
 <Ring radius={.5} tube={.055} position={[0,.03,.454]} xray={xray}/>
 <Ring radius={.38} tube={.015} position={[0,.03,.48]} xray={xray} color={GLASS}/>
 <mesh position={[0,.03,.49]}><cylinderGeometry args={[.17,.17,.13,48]}/><Metal color="#9de4d5" xray={xray}/></mesh>
 {[0,Math.PI/2,Math.PI,3*Math.PI/2].map((r,i)=><mesh key={i} position={[Math.sin(r)*.245,.03+Math.cos(r)*.245,.55]} rotation={[0,0,r]}><boxGeometry args={[.055,.35,.052]}/><Metal xray={xray}/></mesh>)}
 <mesh position={[.48,-.58,.45]}><boxGeometry args={[.18,.08,.1]}/><Metal color={GOLD} xray={xray}/></mesh>
 </group>
}
function Oscillator({xray}){
 const points=useMemo(()=>Array.from({length:100},(_,i)=>new THREE.Vector3(-.56+i*1.12/99,Math.sin(i*.23)*Math.exp(-Math.abs(i-50)/170)*.23,.14)),[])
 const curve=useMemo(()=>new THREE.CatmullRomCurve3(points),[points])
 return <group>
 <mesh><boxGeometry args={[1.48,1.68,.48]}/><Metal color="#7f6b53" xray={xray}/></mesh>
 <mesh position={[0,.12,.27]}><boxGeometry args={[1.26,1.13,.04]}/><Metal color={DARK} xray={xray}/></mesh>
 <mesh position={[0,.12,.31]}><circleGeometry args={[.54,64]}/><meshStandardMaterial color="#143844" emissive="#16776a" emissiveIntensity={xray?.05:.25} transparent opacity={.92}/></mesh>
 <Ring radius={.55} position={[0,.12,.34]} xray={xray}/>
 <mesh geometry={useMemo(()=>new THREE.TubeGeometry(curve,110,.017,6,false),[curve])}><meshBasicMaterial color="#8efbe1" transparent opacity={.97}/></mesh>
 <mesh position={[0,-.65,.28]}><boxGeometry args={[.64,.1,.1]}/><Metal xray={xray}/></mesh>
 <mesh position={[0,.91,0]}><torusGeometry args={[.2,.047,10,45]}/><Metal xray={xray}/></mesh>
 </group>
}
function Globe({xray}){
 const spin=useRef()
 useFrame((_,delta)=>{if(spin.current)spin.current.rotation.y+=Math.min(delta,.04)*.12})
 return <group>
 <group ref={spin} position={[0,.14,0]}>
 <mesh><sphereGeometry args={[.71,48,32]}/><meshStandardMaterial color={xray?'#4bcad0':'#234c60'} metalness={.54} roughness={.37} transparent opacity={xray?.4:1} wireframe={xray}/></mesh>
 {[-.45,0,.45].map((a,i)=><Ring key={i} radius={.72} tube={.012} rotation={[Math.PI/2,a,0]} xray={xray} color="#88dece"/>)}
 <Ring radius={.9} tube={.035} rotation={[.33,.2,.4]} xray={xray}/>
 <Ring radius={.83} tube={.022} rotation={[1.5,.2,.62]} xray={xray} color="#a7ced4"/>
 </group>
 <mesh position={[0,-.71,0]}><cylinderGeometry args={[.055,.055,.6,16]}/><Metal xray={xray}/></mesh>
 <mesh position={[0,-1.04,0]}><cylinderGeometry args={[.51,.6,.14,32]}/><Metal xray={xray}/></mesh>
 </group>
}
function Compass({xray}){
 return <group rotation={[-.08,0,0]}>
 <mesh><cylinderGeometry args={[.85,.85,.18,64]}/><Metal xray={xray}/></mesh>
 <mesh position={[0,.11,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.71,64]}/><meshStandardMaterial color="#19313a" transparent opacity={xray?.42:1} wireframe={xray}/></mesh>
 <Ring radius={.77} tube={.055} rotation={[-Math.PI/2,0,0]} position={[0,.12,0]} xray={xray}/>
 {[0,1,2,3].map(i=><mesh key={i} rotation={[0,i*Math.PI/2,0]} position={[Math.sin(i*Math.PI/2)*.49,.15,Math.cos(i*Math.PI/2)*.49]}><boxGeometry args={[.07,.04,.27]}/><Metal xray={xray}/></mesh>)}
 <mesh rotation={[0,-.7,0]} position={[0,.2,0]}><coneGeometry args={[.18,.92,3]}/><meshStandardMaterial color={xray?'#89fff2':'#a5edd7'} wireframe={xray}/></mesh>
 <mesh position={[0,-.18,0]}><cylinderGeometry args={[.4,.52,.11,32]}/><Metal xray={xray}/></mesh>
 </group>
}
function Exhibit({project,index,selected,xray,onSelect}){
 const x=[-4.5,-1.5,1.5,4.5][index], isSelected=selected===project.id
 return <group position={[x,.1,0]} onClick={e=>{e.stopPropagation();onSelect(project.id)}} onPointerOver={e=>{e.stopPropagation();document.body.style.cursor='pointer'}} onPointerOut={()=>document.body.style.cursor='auto'}>
 <Float speed={isSelected?1.7:1} rotationIntensity={isSelected?.09:.026} floatIntensity={isSelected?.18:.07}>
 <group position={[0,.18,0]} scale={isSelected?1.12:1}>
 {index===0&&<Vault xray={xray}/>}
 {index===1&&<Oscillator xray={xray}/>}
 {index===2&&<Globe xray={xray}/>}
 {index===3&&<Compass xray={xray}/>}
 </group></Float>
 <mesh position={[0,-1.23,0]}><cylinderGeometry args={[1.12,1.19,.24,6]}/><Metal color="#4a3726" xray={xray}/></mesh>
 <mesh position={[0,-1.1,0]}><cylinderGeometry args={[1.03,1.06,.055,6]}/><Metal xray={xray}/></mesh>
 <mesh position={[0,-1.21,.98]}><boxGeometry args={[1.18,.22,.04]}/><Metal color="#665035" xray={xray}/></mesh>
 {isSelected&&<pointLight position={[0,1.2,.65]} color={project.color} intensity={5} distance={5}/>}
 </group>
}
function Room({xray}){
 return <group>
 <mesh position={[0,-1.42,0]}><boxGeometry args={[15,.24,4.2]}/><Metal color="#3d2a1d" xray={xray}/></mesh>
 <mesh position={[0,-1.65,.62]}><boxGeometry args={[15,.38,3.1]}/><Metal color="#241a18" xray={xray}/></mesh>
 <mesh position={[0,1,-2.2]}><planeGeometry args={[16,7]}/><meshStandardMaterial color="#101b25" roughness={1}/></mesh>
 {Array.from({length:13},(_,i)=><mesh key={i} position={[-7.2+i*1.2,1,-2.17]}><boxGeometry args={[.025,6,.04]}/><Metal color="#524735" xray={xray}/></mesh>)}
 {[-5.95,-2.95,.05,3.05,6.05].map((x,i)=><mesh key={i} position={[x,2.9,-2.05]}><boxGeometry args={[.06,.55,.2]}/><Metal xray={xray}/></mesh>)}
 <mesh position={[0,-1.22,.6]}><boxGeometry args={[15,.055,2.9]}/><Metal color={GOLD} xray={xray}/></mesh>
 </group>
}
function CameraRig({selected}){
 const pos=useMemo(()=>new THREE.Vector3(),[])
 const look=useMemo(()=>new THREE.Vector3(0,.02,0),[])
 useFrame(({camera},delta)=>{
  const i=['zuri','aac','oracle','pathwise'].indexOf(selected)
  const targetX=i<0?0:[-4.5,-1.5,1.5,4.5][i]
  const desiredZ=i<0?14.6:8.7
  const alpha=1-Math.exp(-Math.min(delta,.05)*2.9)
  pos.set(targetX*.57,1.6,desiredZ);camera.position.lerp(pos,alpha)
  look.set(targetX*.75,.06,0);camera.lookAt(look)
 })
 return null
}
function MuseumScene({selected,xray,onSelect}){
 return <>
 <color attach="background" args={['#080e17']}/>
 <fog attach="fog" args={['#080e17',16,29]}/>
 <ambientLight intensity={xray?.65:.34}/>
 <hemisphereLight color="#8adcd9" groundColor="#2a1510" intensity={.55}/>
 <spotLight position={[-4,7,5]} intensity={165} color="#ffe0a1" angle={.47} penumbra={.9} distance={21}/>
 <spotLight position={[3,6,2]} intensity={110} color="#79aeb4" angle={.52} penumbra={.85} distance={18}/>
 <pointLight position={[0,1,4]} intensity={36} color={xray?'#3aeeec':'#efc88a'} distance={15}/>
 <Room xray={xray}/>
 {PROJECTS.map((project,i)=><Exhibit key={project.id} project={project} index={i} selected={selected} xray={xray} onSelect={onSelect}/>)}
 <CameraRig selected={selected}/>
 </>
}
import {PROJECTS} from './data'
export default function Museum({selected,xray,onSelect,onReady,onFail}){
 return <Canvas camera={{position:[0,1.6,14.6],fov:43,near:.1,far:80}} dpr={[1,1.6]} gl={{antialias:true,powerPreference:'high-performance',alpha:false}} onCreated={({gl})=>{gl.outputColorSpace=THREE.SRGBColorSpace;onReady?.()}} onError={onFail} shadows={false} performance={{min:.5}}>
 <MuseumScene selected={selected} xray={xray} onSelect={onSelect}/>
 </Canvas>
}
