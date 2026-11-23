// Cielo de estrellas del prototipo: mismo generador con semilla (Lehmer, seed 7),
// así las posiciones son siempre las mismas. Se calculan una sola vez al cargar el módulo.
const ESTRELLES = (() => {
  let llavor = 7
  const atzar = () => {
    llavor = (llavor * 16807) % 2147483647
    return (llavor - 1) / 2147483646
  }
  return Array.from({ length: 26 }, () => ({
    x: Math.round(atzar() * 1440),
    y: Math.round(atzar() * 520 + 30),
    r: Number((atzar() * 1.8 + 1).toFixed(1)),
  }))
})()

// Decorativo: aria-hidden. La clase "estrella" la usa GSAP para animarlas.
export default function Estrelles({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      {ESTRELLES.map((e, i) => (
        <circle key={i} className="estrella fill-bone" cx={e.x} cy={e.y} r={e.r} />
      ))}
    </svg>
  )
}
