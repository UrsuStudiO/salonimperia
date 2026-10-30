import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ignoreMobileResize:true}); // la barra del navegador móvil no reinicia las escenas fijas
export function initMotion(){

const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
if(rm)document.documentElement.classList.add('rm');
const split=(el,words)=>{const t=el.textContent.trim();el.innerHTML=(words?t.split(' '):[...t]).map(x=>`<span class="w"><span>${x}</span></span>`).join(words?' ':'');return $$(`#${el.id||'x'} .w>span`)};
let lenis;const raf=t=>lenis.raf(t*1000);
if(!rm){lenis=new Lenis({lerp:.085});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(raf);gsap.ticker.lagSmoothing(0)}
$$('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=$(a.getAttribute('href'));lenis?lenis.scrollTo(t,{duration:2}):t.scrollIntoView()});

/* ---------- Hero ---------- */
gsap.from(split($('.ttl')),{yPercent:115,rotate:7,duration:1.7,ease:'expo.out',stagger:.08,delay:.3});
gsap.from('.hero .k,.sub,.cue',{opacity:0,y:20,duration:1.4,delay:1.1,stagger:.2});
if(!rm){
gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:'+=260%',pin:true,scrub:1}})
 .to('.iris',{clipPath:'circle(75% at 50% 50%)',ease:'none',duration:1},0)
 .fromTo('.iris img',{scale:1.35},{scale:1,ease:'none',duration:1},0)
 .to('.ring',{scale:1,ease:'none',duration:1},0).to('.ring',{opacity:0,duration:.25},.75)
 .to('.hc',{scale:1.3,opacity:0,ease:'none',duration:.45},0).to('.cue',{opacity:0,duration:.1},0);

/* Manifiesto: palabra a palabra */
const mf=$('#mf');mf.innerHTML=mf.textContent.split(' ').map(w=>`<span class="m">${w}</span>`).join(' ');
gsap.fromTo('.m',{opacity:.12},{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:mf,start:'top 78%',end:'bottom 50%',scrub:true}});

/* Actos: escena fija con marco 3D que gira y fotos que se revelan */
const A=$$('.a'),F=$$('.frame img');gsap.set(A.slice(1),{opacity:0});
gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'.actos',start:'top top',end:'+=320%',pin:true,scrub:1}})
 .fromTo('.frame',{rotateY:-16,rotateX:5},{rotateY:16,rotateX:-5,duration:3},0)
 .fromTo(F[1],{clipPath:'inset(100% 0 0 0)',scale:1.3},{clipPath:'inset(0% 0 0 0)',scale:1,duration:1},1)
 .fromTo(F[2],{clipPath:'inset(100% 0 0 0)',scale:1.3},{clipPath:'inset(0% 0 0 0)',scale:1,duration:1},2)
 .to(A[0],{opacity:0,y:-50,duration:.4},.8).fromTo(A[1],{opacity:0,y:50},{opacity:1,y:0,duration:.4},1.05)
 .to(A[1],{opacity:0,y:-50,duration:.4},1.8).fromTo(A[2],{opacity:0,y:50},{opacity:1,y:0,duration:.4},2.05)
 .to('.bar i',{scaleX:1,duration:3},0);

/* Cifras: contadores + parallax */
$$('.n b').forEach(b=>{const o={v:0};gsap.to(o,{v:+b.dataset.v,duration:2.4,ease:'power3.out',onUpdate:()=>b.textContent=Math.round(o.v).toLocaleString('es'),scrollTrigger:{trigger:b,start:'top 88%'}})});
$$('.cell').forEach((c,i)=>gsap.fromTo(c,{y:90*(i%2+1)},{y:-40*(i%2+1),ease:'none',scrollTrigger:{trigger:c,scrub:true,start:'top bottom',end:'bottom top'}}));

/* Galas: scroll horizontal con parallax interno y giro 3D */
const tr=$('.track'),ht=gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.galas',pin:true,scrub:1,end:()=>'+='+tr.scrollWidth,invalidateOnRefresh:true}});
$$('.card').forEach(c=>{const st={trigger:c,containerAnimation:ht,start:'left right',end:'right left',scrub:true};
 gsap.fromTo(c.querySelector('img'),{xPercent:-10},{xPercent:10,ease:'none',scrollTrigger:st});
 gsap.fromTo(c,{rotateY:24},{rotateY:-24,ease:'none',scrollTrigger:st})});

/* Marquesina con inclinación por velocidad */
const mt=$('.mt');mt.innerHTML=('<span>Bodas</span><em>✦</em><span>Galas</span><em>✦</em><span>Congresos</span><em>✦</em>').repeat(4);
gsap.to(mt,{xPercent:-50,duration:40,ease:'none',repeat:-1});
const sk=gsap.quickTo('.mqi','skewX',{duration:.5});lenis.on('scroll',e=>sk(gsap.utils.clamp(-8,8,e.velocity*-.5)));

/* Cierre */
gsap.from(split($('#big'),true),{yPercent:110,duration:1.4,ease:'expo.out',stagger:.12,scrollTrigger:{trigger:'#big',start:'top 80%'}});
gsap.to('.prog',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.3}});
const cta=$('.cta'),qx=gsap.quickTo(cta,'x',{duration:.6,ease:'power3'}),qy=gsap.quickTo(cta,'y',{duration:.6,ease:'power3'});
cta.onpointermove=e=>{const r=cta.getBoundingClientRect();qx((e.clientX-r.left-r.width/2)*.35);qy((e.clientY-r.top-r.height/2)*.35)};
cta.onpointerleave=()=>{qx(0);qy(0)};
cta.onclick=()=>cta.textContent='Gracias · le escribiremos (demo)';
}
document.fonts?.ready.then(()=>ScrollTrigger.refresh());

return()=>{ScrollTrigger.getAll().forEach(t=>t.kill());gsap.ticker.remove(raf);lenis&&lenis.destroy()}}
