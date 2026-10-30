import { useEffect, useState } from "react";
import { PALETAS, getPalette, setPalette, syncMeta } from "../lib/palette.js";

export default function Paletas() {
  const [id, setId] = useState(() => getPalette().id);
  useEffect(syncMeta, []);
  const elegir = (p, e) => { setId(p.id); setPalette(p.id, e); };
  return (
    <div className="pal" role="radiogroup" aria-label="Paleta de colores">
      <span className="nm">{PALETAS.find((p) => p.id === id).nombre}</span>
      {PALETAS.map((p) => (
        <button key={p.id} type="button" role="radio" aria-checked={p.id === id} aria-label={p.nombre} title={p.nombre}
          style={{ "--a": p.acc, "--b": p.bg }} onClick={(e) => elegir(p, e)} />
      ))}
    </div>
  );
}
