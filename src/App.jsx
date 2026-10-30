import { useEffect } from "react";
import Paletas from "./components/Paletas.jsx";
import { initScene } from "./lib/scene.js";
import { initMotion } from "./lib/motion.js";

export default function App() {
  useEffect(() => {
    const a = initScene(), b = initMotion();
    return () => { b(); a(); };
  }, []);
  return (
    <>
      <canvas id="gl" aria-hidden="true" />
      <div className="veil" /><div className="grain" /><div className="prog" />
      <header className="nav">
        <a href="#top" className="logo d">Imperia</a>
        <nav><a href="#actos">Actos</a><a href="#cifras">Cifras</a><a href="#galas">Galas</a><a href="#reservas">Reservas</a></nav>
        <Paletas />
      </header>
      <main>
<section id="top" className="hero"><div className="iris"><img src="/img/hero-salon.webp" alt="Salón Imperia iluminado con arañas de cristal" /></div><div className="ring"></div>
<div className="hc"><p className="k">Achumani · La Paz</p><h1 id="ttl" className="ttl d">Imperia</h1><p className="sub">Donde la noche se convierte en ceremonia.</p></div>
<div className="cue"><span className="k">Deslice para encender la sala</span><i></i></div></section>

<section className="man"><p className="d" id="mf">Hay salones donde se celebra. Y hay uno donde se recuerda. Salón Imperia nace para las noches que no admiten ensayo: una boda que se cuenta durante décadas, una gala que cambia el rumbo de una empresa.</p></section>

<section id="actos" className="actos"><div className="stage">
<div className="tx">
<div className="a"><p className="k">Acto I</p><h2 className="d">Ceremonia</h2><p>Un pasillo de velas, arreglos florales de techo a piso y una acústica pensada para que cada voto se escuche sin micrófono. Capacidad para 450 invitados sentados.</p></div>
<div className="a"><p className="k">Acto II</p><h2 className="d">Banquete</h2><p>Mesas imperiales con cristalería y vajilla a medida. Cocina propia con chef ejecutivo, menús de cinco tiempos y maridaje con bodega boliviana seleccionada.</p></div>
<div className="a"><p className="k">Acto III</p><h2 className="d">Baile</h2><p>Pista de 180 m² con iluminación escénica programable: del claroscuro del primer vals a la luz plena de la madrugada. Sonido envolvente y cabina de DJ integrada.</p></div></div>
<div className="fw"><div className="frame">
<img src="/img/acto-ceremonia.webp" alt="Pasillo de ceremonia con velas y flores blancas" />
<img src="/img/acto-banquete.webp" alt="Mesas imperiales con vajilla dorada y cristalería" />
<img src="/img/acto-baile.webp" alt="Pista de baile bajo luces cálidas" /></div></div>
<div className="bar"><i></i></div></div></section>

<section id="cifras" className="cif"><p className="k">La medida de Imperia</p><div className="cg">
<div className="cell"><span className="d n"><b data-v="600">0</b></span><p>invitados en el salón principal</p></div>
<div className="cell"><span className="d n"><b data-v="1200">0</b><small> m²</small></span><p>de espacio continuo, sin columnas</p></div>
<div className="cell"><span className="d n"><b data-v="18">0</b></span><p>años dirigiendo noches memorables</p></div>
<div className="cell"><span className="d n"><b data-v="340">0</b></span><p>eventos al año, uno por vez</p></div></div></section>

<section id="galas" className="galas"><div className="track">
<div className="gt"><p className="k">Galas corporativas</p><h2 className="d">Su empresa, en escena</h2></div>
<article className="card"><div className="im"><img src="/img/gala-cena.webp" alt="Cena de gala" /></div><h3 className="d">Cenas de gala</h3><p>Premiaciones y cenas de directorio para 500 comensales, con escenario y backstage propios.</p></article>
<article className="card"><div className="im"><img src="/img/gala-congreso.webp" alt="Congreso" /></div><h3 className="d">Congresos</h3><p>Plenaria, salas paralelas y traducción simultánea en un solo piso.</p></article>
<article className="card"><div className="im"><img src="/img/gala-lanzamiento.webp" alt="Lanzamiento de producto" /></div><h3 className="d">Lanzamientos</h3><p>Pantalla LED de 12 metros y puesta en escena con control total de la luz.</p></article>
<article className="card"><div className="im"><img src="/img/gala-aniversario.webp" alt="Aniversario corporativo" /></div><h3 className="d">Aniversarios</h3><p>Cuando una empresa cumple décadas, la sala se viste a su medida.</p></article>
</div></section>

<section className="mq" aria-hidden="true"><div className="mqi"><div className="mt d"></div></div></section>

<section id="reservas" className="end"><p className="k">Reservas</p><h2 className="big d" id="big">Reserve su fecha</h2>
<div className="info"><p className="d">Cada fecha tiene una sola celebración. Visítenos antes de decidir.</p>
<address>Achumani, Zona Sur<br />La Paz, Bolivia<br />Visitas con cita, lun–sáb 10:00–19:00</address>
<div><button className="tel d" type="button">+591 700 00000</button><button type="button">reservas@salonimperia.example</button></div></div>
<button className="cta" type="button">Solicitar una visita</button>
<div className="ft"><span>© 2026 SALÓN IMPERIA · DATOS DE EJEMPLO</span><div className="cr"><div className="pop" aria-hidden="true"><span>Ursu<b>Studio</b></span></div><a href="https://ursustudio.vercel.app/" target="_blank" rel="noopener noreferrer">Créditos</a></div></div></section>
</main>
    </>
  );
}
