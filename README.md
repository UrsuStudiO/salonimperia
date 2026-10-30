# Salón Imperia · Landing 3D

Landing de lujo con escena **Three.js** (araña de cristal + polvo dorado, cámara guiada por el scroll), **GSAP ScrollTrigger** (scrub, pin, scroll horizontal, parallax) y **Lenis**. React 19 + Vite.

```bash
npm install
npm run dev
npm run build
```

## Estructura
- `src/App.jsx`: marcado de las secciones y selector de paletas.
- `src/lib/scene.js`: escena 3D (araña, luces, niebla y polvo toman los colores de la paleta activa).
- `src/lib/motion.js`: todas las animaciones de scroll y la marquesina.
- `src/lib/palette.js`: las paletas y el cambio entre ellas con transición circular (View Transitions); avisa a la escena 3D.
- `src/components/Paletas.jsx`: el selector de paletas del menú.
- `src/index.css`: colores de cada paleta (`:root` y `[data-palette]`), tamaños de texto, el velo que mantiene legible el texto sobre el 3D y el botón de créditos. Los estilos viven aquí (no se usa Tailwind).

## Notas
- Solo modo oscuro. La paleta elegida se guarda en `localStorage` (clave `palette`) y `index.html` la aplica antes del primer pintado.
- `prefers-reduced-motion`: sin scroll suave ni escenas fijas; la escena 3D se dibuja una sola vez.
- Las fotos de `public/img/` son marcadores: reemplázalas conservando el nombre. Los datos de contacto son de ejemplo.

## Legibilidad y tipografía
- El texto no lleva sombras ni brillos. La legibilidad sale de tres cosas: un velo del color del fondo sobre la escena 3D (`.veil`, opacidad `.34`), colores con buen contraste en todas las paletas (`--mut`, `--gold`) y tamaños generosos.
- Tamaños base (en `src/index.css`): cuerpo `1.125rem`; párrafos de Actos, Cifras, Galas y Reservas entre `1.2rem` y `1.3rem`; etiquetas (`.k`) `.86rem`; enlaces del menú `.84rem`; títulos de las tarjetas de Galas `2.9rem`.
- Para ajustar el texto: cambia esos valores (`.a p`, `.cell p`, `.card p`, `.info address`, `.k`). Para más o menos velo sobre el 3D, cambia `opacity` en `.veil`.

## Créditos
El botón "Créditos" (esquina inferior derecha) funciona así: al pasar el cursor o enfocarlo con el teclado, el texto "UrsuStudio" sube desde abajo sobre el botón. Es solo CSS (`.cr` en `src/index.css`; marcado en `src/App.jsx`) y abre https://ursustudio.vercel.app/ en otra pestaña.

## Responsive (celular)
- `html` y `body` recortan cualquier desborde horizontal (`overflow-x: clip`) y el menú tiene `width:100%`; si algún elemento se pasara del ancho, el navegador móvil amplía la página y el menú fijo parece despegado.
- Bloque `@media (max-width: 800px)` al final de `src/index.css`: Actos con foto más baja y texto más compacto, cifras en 2 columnas con número escalado al ancho, botón de reserva al 100 %, contacto que parte líneas largas y créditos alineados a la derecha.
- `ScrollTrigger.config({ ignoreMobileResize: true })` evita que las escenas fijas se reinicien cuando la barra de direcciones del móvil se oculta o aparece.

## Paletas (demo para clientes)
La página es solo oscura y trae 4 paletas elegibles desde el menú (los círculos de arriba a la derecha): **Noche dorada** (predeterminada), **Esmeralda**, **Burdeos** y **Zafiro**. Cambian el color de todo el sitio y de la escena 3D (cristales, anillos, luz, niebla y polvo), con una transición circular. Sirve para mostrar a un cliente cómo quedaría con su color; a cada cliente se le entrega una sola paleta.

Para añadir o cambiar una paleta:
1. En `src/lib/palette.js`, agrega un objeto a `PALETAS` (`id`, `nombre`, `bg`, `acc` y los colores 3D).
2. En `src/index.css`, agrega un bloque `[data-palette="tu-id"]{...}` con `--bg`, `--fg`, `--mut`, `--gold`, `--line` y `--nav`.
3. Para entregar una sola paleta, deja solo esa en `PALETAS` y quita `<Paletas />` de `src/App.jsx`.

## Velocidad de la araña
La araña gira despacio para no marear. En `src/lib/scene.js`:

```js
G.rotation.y = t*.045 + ps*1.4
```

`t*.045` es el giro constante y `ps*1.4` lo que suma el scroll. Baja los valores para más calma o súbelos para más movimiento.