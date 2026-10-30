import * as THREE from 'three';import {getPalette} from './palette.js';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,$=s=>document.querySelector(s);
export function initScene(){
/* ---------- Escena 3D: araña de cristal + polvo dorado, cámara guiada por el scroll ---------- */
const state={P:0,mx:0,my:0};let ps=0;
try{
const R=new THREE.WebGLRenderer({canvas:$('#gl'),antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,1.75));
const S=new THREE.Scene();S.fog=new THREE.FogExp2(0x0a0807,.034);
const C=new THREE.PerspectiveCamera(50,1,.1,80);
const AL=new THREE.AmbientLight(0xffe2b0,.5);S.add(AL);
const L=new THREE.PointLight(0xffc27a,90,40);L.position.set(0,1.2,0);S.add(L);
const L2=new THREE.DirectionalLight(0x8fa8ff,1.3);L2.position.set(-5,3,5);S.add(L2);
const G=new THREE.Group();S.add(G);
const cg=new THREE.OctahedronGeometry(.1);cg.scale(1,2.4,1);
const mat=new THREE.MeshStandardMaterial({color:0xf1d89c,metalness:.8,roughness:.15,emissive:0x7a5212,emissiveIntensity:.6,flatShading:true});
const pts=[],gold=new THREE.MeshBasicMaterial({color:0xc9a45c});
for(let t=0;t<6;t++){const r=.55+t*.5,n=10+t*7;
 for(let i=0;i<n;i++){const a=i/n*6.2832;for(let k=0;k<3;k++)pts.push([Math.cos(a)*r,2.4-t*.75-k*.32,Math.sin(a)*r])}
 const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.014,6,96),gold);ring.rotation.x=Math.PI/2;ring.position.y=2.52-t*.75;G.add(ring)}
const im=new THREE.InstancedMesh(cg,mat,pts.length),d=new THREE.Object3D();
pts.forEach((p,i)=>{d.position.set(...p);d.rotation.y=i;d.updateMatrix();im.setMatrixAt(i,d.matrix)});G.add(im);
const rod=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,8),gold);rod.position.y=6;G.add(rod);
const cv=document.createElement('canvas');cv.width=cv.height=128;const x=cv.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);
g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);
const tex=new THREE.CanvasTexture(cv);
const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.5}));glow.scale.set(9,9,1);glow.position.y=.8;G.add(glow);
const N=1600,pa=new Float32Array(N*3);for(let i=0;i<N*3;i++)pa[i]=(Math.random()-.5)*28;
const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(pa,3));
const dust=new THREE.Points(dg,new THREE.PointsMaterial({map:tex,size:.2,color:0xffd89a,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));S.add(dust);
const cp=new THREE.CatmullRomCurve3([[0,.6,11],[0,1.2,7],[5.5,.5,3.5],[0,-2.8,-.5],[-5.5,1,3],[0,1.5,9]].map(a=>new THREE.Vector3(...a)));
/* Tema claro / oscuro: la escena 3D cambia de materiales, niebla y mezcla de luz */
const th=e=>{const p=getPalette();
 S.fog.color.set(p.fog);L.color.set(p.light);mat.color.set(p.crystal);mat.emissive.set(p.emissive);
 gold.color.set(p.ring);glow.material.color.set(p.glow);glow.material.opacity=.32;dust.material.color.set(p.dust);
 if(e)R.render(S,C)};
th();addEventListener('themechange',th);
const rs=()=>{R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()};rs();addEventListener('resize',rs);
const frame=t=>{ps+=(state.P-ps)*.07;cp.getPoint(ps,C.position);C.position.x+=state.mx*.7;C.position.y+=state.my*.5;if(innerWidth<700)C.position.z+=3;
 C.lookAt(0,.8,0);G.rotation.y=t*.045+ps*1.4;dust.rotation.y=t*.02;dust.position.y=-ps*3;R.render(S,C)};
if(rm)frame(0);else gsap.ticker.add(frame);
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>state.P=s.progress});
addEventListener('pointermove',e=>{state.mx=e.clientX/innerWidth-.5;state.my=-(e.clientY/innerHeight-.5)});
return()=>{gsap.ticker.remove(frame);R.dispose()}}catch(e){console.warn('WebGL no disponible',e);return()=>{}}


}
