// Paletas oscuras. Cada una define el color del sitio (bg/acc, también en index.css) y los colores de la escena 3D.
export const PALETAS = [
  { id: "oro", nombre: "Noche dorada", bg: "#0a0807", acc: "#e0bd72",
    fog: "#0a0807", crystal: "#f1d89c", emissive: "#7a5212", ring: "#c9a45c", light: "#ffc27a", dust: "#ffd89a", glow: "#ffd68c" },
  { id: "esmeralda", nombre: "Esmeralda", bg: "#06100d", acc: "#8fd9b6",
    fog: "#06100d", crystal: "#bfeed5", emissive: "#0f5a3d", ring: "#5fbf92", light: "#7dffc4", dust: "#9ff0c8", glow: "#5fe0a8" },
  { id: "burdeos", nombre: "Burdeos", bg: "#120708", acc: "#eaa89c",
    fog: "#120708", crystal: "#f3c4b8", emissive: "#7a1f2b", ring: "#d98f84", light: "#ff9d8a", dust: "#ffc2b5", glow: "#ff8f7a" },
  { id: "zafiro", nombre: "Zafiro", bg: "#060912", acc: "#9db8ff",
    fog: "#060912", crystal: "#cfdcff", emissive: "#1c2f7a", ring: "#7f9ff0", light: "#8fb0ff", dust: "#b5c9ff", glow: "#7a9bff" },
];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const getPalette = () => PALETAS.find((p) => p.id === document.documentElement.dataset.palette) || PALETAS[0];
export const syncMeta = () => document.querySelector('meta[name="theme-color"]')?.setAttribute("content", getPalette().bg);

// Cambia de paleta con un círculo que se expande desde el botón (View Transitions) y avisa a la escena 3D.
export function setPalette(id, e) {
  const apply = () => {
    document.documentElement.dataset.palette = id;
    syncMeta();
    try { localStorage.setItem("palette", id); } catch { /* sin almacenamiento: dura la sesión */ }
    dispatchEvent(new Event("themechange"));
  };
  if (!document.startViewTransition || reduced() || !e) return apply();
  const r = e.currentTarget.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready
    .then(() => document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 1000, easing: "cubic-bezier(.65,0,.25,1)", pseudoElement: "::view-transition-new(root)" }))
    .catch(() => {});
}
