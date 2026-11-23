import { useRef } from 'react'
import Estrelles from './Estrelles.jsx'
import { gsap, useGSAP, AMB_MOVIMENT } from '../animacio.js'

// Layout de Login y Registre: pantalla partida en la línea de la sección «noche».
// Izquierda: panel ink con luna, estrellas, lema y frase (sin texto encima de la luna).
// Derecha: el formulario. En móvil, una sola columna con el panel bajito arriba.
// El padding superior deja sitio a la píldora fija del nav (top 16px + ~64px de alto).
export default function PanellAuth({ titol, lema, frase, children }) {
  const panell = useRef(null)

  // Entrada sencilla: la luna sube y aparece el lema. Nada con «reducir movimiento».
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        AMB_MOVIMENT,
        () => {
          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('.lluna', { y: 200, autoAlpha: 0, duration: 1.2 })
            .from('.lema', { y: 24, autoAlpha: 0, duration: 0.8 }, '-=0.7')
        },
        panell,
      )
    },
    { scope: panell },
  )

  return (
    <main className="grid min-h-dvh md:grid-cols-2">
      <div
        ref={panell}
        className="zona-fosca relative flex flex-col justify-end overflow-hidden bg-ink px-6 pt-28 pb-8 md:px-12 md:pb-16"
      >
        <Estrelles />
        <div
          aria-hidden="true"
          className="lluna absolute top-24 right-6 size-16 rounded-full bg-accent shadow-[0_0_60px_rgba(224,185,59,0.35)] md:top-[22%] md:right-[14%] md:size-40"
        />
        <div className="lema relative pr-24 md:pr-0">
          <p className="text-4xl leading-none font-extrabold tracking-[-0.045em] text-bone md:text-7xl">
            {lema}
          </p>
          <p className="mt-3 max-w-[36ch] text-lichen-light md:mt-5 md:text-lg">{frase}</p>
        </div>
      </div>

      <section className="flex items-center justify-center px-4 py-12 md:pt-28">
        <div className="w-full max-w-[400px]">
          <h1 className="mb-8 text-3xl font-extrabold tracking-[-0.03em]">{titol}</h1>
          {children}
        </div>
      </section>
    </main>
  )
}
