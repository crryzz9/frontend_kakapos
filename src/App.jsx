import { useRef } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useSessio } from './context/sessio.js'
import { gsap, ScrollTrigger, useGSAP, AMB_MOVIMENT } from './animacio.js'

function App() {
  const { usuari, tancarSessio } = useSessio()
  const nav = useRef(null)
  const amagar = useRef(null) // tween que esconde el nav (null con «reducir movimiento»)
  const { pathname } = useLocation()

  // El nav se esconde al bajar y vuelve al subir. Se recrea en cada ruta (cada página
  // tiene otra altura). Con «reducir movimiento» no se crea: siempre visible.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(AMB_MOVIMENT, () => {
        // Un solo tween en pausa: play() lo esconde y reverse() lo devuelve.
        // Al estar creado aquí, useGSAP lo revierte (nav visible) al cambiar de ruta.
        const tween = gsap.to(nav.current, { yPercent: -170, duration: 0.35, ease: 'power2.out', paused: true })
        amagar.current = tween
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            if (self.direction === 1 && self.scroll() > 160) tween.play()
            else tween.reverse()
          },
        })
        return () => {
          amagar.current = null
        }
      })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )
  // NavLink ya pone aria-current="page" en el enlace activo; aquí solo se resalta
  const enllac = ({ isActive }) =>
    `py-2 hover:text-moss decoration-2 underline-offset-4 ${isActive ? 'underline' : ''}`

  return (
    <>
      {/* Píldora fija del prototipo: bone, borde fino y radio total, máximo 1200px */}
      {/* onFocus: si se llega con el teclado a un enlace del nav escondido, vuelve a aparecer */}
      <header ref={nav} onFocus={() => amagar.current?.reverse()} className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-32px)] max-w-[1200px] items-center justify-between gap-4 rounded-full border border-ink/14 bg-bone py-2.5 pr-2.5 pl-5">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[19px] font-extrabold tracking-[-0.02em] hover:text-moss"
        >
          <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true" focusable="false">
            <path d="M13 2c6 3 10 9 9 15-1 4-5 7-9 7s-8-3-9-7C3 11 7 5 13 2z" className="fill-lichen" />
            <path
              d="M8 12h10M7 16h12M9 20h8"
              className="stroke-ink"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          {/* En pantallas muy estrechas el texto queda solo para lectores de pantalla */}
          <span className="max-[400px]:sr-only">Kakapos</span>
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-4 text-[15px] font-semibold sm:gap-[22px]">
          <Link to="/#col" className="hidden py-2 hover:text-moss sm:inline">
            Col·lecció
          </Link>

          {usuari ? (
            <>
              <span className="max-w-[14ch] truncate font-normal" title={usuari.nom}>
                <span className="sr-only">Sessió iniciada com a </span>
                {usuari.nom}
              </span>
              <button
                type="button"
                onClick={tancarSessio}
                className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-bone sm:px-5"
              >
                Tancar sessió
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={enllac}>
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-bone decoration-2 underline-offset-4 hover:underline sm:px-5"
              >
                Crear compte
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default App
