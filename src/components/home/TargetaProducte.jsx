const preu = new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' })

// Iconos del prototipo (caja de ~120×100, trazo de 4px)
const ICONES = {
  samarreta: 'M40 22L22 34l8 16 8-4v52h44V46l8 4 8-16-18-12c-4 8-12 12-20 12s-16-4-20-12z',
  gorra: 'M20 74c0-28 18-44 40-44s40 16 40 44zM60 74h46c8 0 10 8 2 10-10 3-28 2-48-2',
  tassa: 'M30 40h50v46c0 8-6 12-14 12H44c-8 0-14-4-14-12zM80 52h8c8 0 12 6 12 12s-4 12-12 12h-8M46 18c-4-6 4-8 0-14M62 18c-4-6 4-8 0-14',
  bossa: 'M28 40h64l-6 58H34zM46 40v-8c0-8 6-14 14-14s14 6 14 14v8',
}

// Combinaciones del prototipo por categoría (slug). fons: fondo, barres: patrón, icona: trazo.
const ESTILS = {
  samarretes: {
    icona: ICONES.samarreta,
    colors: [
      { fons: 'fill-lichen', barres: 'fill-ink', opacitat: 0.2, icona: 'stroke-ink' },
      { fons: 'fill-paper', barres: 'fill-moss', opacitat: 0.22, icona: 'stroke-ink' },
    ],
  },
  gorres: {
    icona: ICONES.gorra,
    colors: [
      { fons: 'fill-moss', barres: 'fill-lichen', opacitat: 0.5, icona: 'stroke-bone' },
      { fons: 'fill-accent', barres: 'fill-ink', opacitat: 0.16, icona: 'stroke-ink' },
    ],
  },
  tasses: {
    icona: ICONES.tassa,
    colors: [
      { fons: 'fill-paper', barres: 'fill-lichen', opacitat: 0.45, icona: 'stroke-ink' },
      { fons: 'fill-lichen', barres: 'fill-paper', opacitat: 0.35, icona: 'stroke-ink' },
    ],
  },
}
// Cualquier otra categoría: bolsa y colores neutros
const GENERIC = {
  icona: ICONES.bossa,
  colors: [{ fons: 'fill-bone', barres: 'fill-moss', opacitat: 0.18, icona: 'stroke-moss' }],
}

// Barras inclinadas del plumaje (patrón del prototipo)
const BARRES = [
  [4, 8],
  [32, 8],
  [18, 36],
  [-10, 36],
  [46, 36],
]

export default function TargetaProducte({ producte, index }) {
  const categoria = producte.categoriaId // populado: { _id, nom, slug } (o null si se borró)
  const estil = ESTILS[categoria?.slug] ?? GENERIC
  // Determinista: misma posición en la lista → mismos colores
  const c = estil.colors[index % estil.colors.length]
  const idPatro = `patro-${producte._id}`

  return (
    <article className="targeta w-[min(400px,80vw)] shrink-0 overflow-hidden rounded-[26px] bg-ink2">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
        className="block h-[min(300px,34dvh)] w-full"
      >
        <defs>
          <pattern id={idPatro} width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
            {BARRES.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="18" height="5" rx="2.5" className={c.barres} fillOpacity={c.opacitat} />
            ))}
          </pattern>
        </defs>
        <rect width="400" height="300" className={c.fons} />
        <rect width="400" height="300" fill={`url(#${idPatro})`} />
        <g
          transform="translate(140 90)"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={c.icona}
        >
          <path d={estil.icona} />
        </g>
      </svg>

      <div className="flex items-start justify-between gap-4 px-6 pt-[22px] pb-[26px]">
        <div>
          <h3 className="text-[19px] font-bold tracking-[-0.01em] text-bone">{producte.nom}</h3>
          <p className="mt-1.5 text-[15px] text-lichen-light">{categoria?.nom ?? 'Sense categoria'}</p>
        </div>
        <p className="text-[19px] font-extrabold whitespace-nowrap text-accent">{preu.format(producte.preu)}</p>
      </div>
    </article>
  )
}
