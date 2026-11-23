import { useRef } from 'react'
import Estrelles from '../Estrelles.jsx'
import { gsap, useGSAP, AMB_MOVIMENT, colorTema } from '../../animacio.js'

const TITOL = 'max-w-[11ch] text-[clamp(48px,7vw,104px)] leading-[0.98] font-extrabold tracking-[-0.045em]'

// Estado por defecto = estado final («noche»): es lo que se ve con «reducir movimiento».
// La animación parte del día (fondo paper y texto «De dia…») y lo lleva hasta aquí.
export default function DiaNit() {
  const seccio = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        AMB_MOVIMENT,
        () => {
          // Estado inicial: de día (al revertir, vuelve solo al CSS de noche)
          gsap.set(seccio.current, { backgroundColor: colorTema('paper') })
          gsap.set('.dia', { autoAlpha: 1 })
          gsap.set('.nit-text', { autoAlpha: 0, y: 40 })
          gsap.set('.estrella', { autoAlpha: 0 })
          gsap.set('.lluna', { y: 460 })

          // Sección fijada 1400px de scroll. Orden pensado para el contraste:
          // 1) se va el texto de día  2) cambia el fondo (sin texto) y sube la luna
          // 3) estrellas  4) solo entonces aparece el texto de noche
          gsap
            .timeline({
              scrollTrigger: { trigger: seccio.current, start: 'top top', end: '+=1400', pin: true, scrub: 1 },
            })
            .to('.dia', { autoAlpha: 0, y: -40, duration: 0.2 })
            .to(seccio.current, { backgroundColor: colorTema('ink'), duration: 0.35, ease: 'none' })
            .to('.lluna', { y: 0, duration: 0.45, ease: 'none' }, '<')
            .to('.estrella', { autoAlpha: 1, duration: 0.2, stagger: { each: 0.01, from: 'random' } }, '-=0.15')
            .to('.nit-text', { autoAlpha: 1, y: 0, duration: 0.2 })
        },
        seccio,
      )
    },
    { scope: seccio },
  )

  return (
    <section ref={seccio} className="nit relative h-[820px] overflow-hidden bg-ink">
      <Estrelles />
      <div
        aria-hidden="true"
        className="lluna absolute top-[150px] right-[16%] size-[210px] rounded-full bg-accent shadow-[0_0_90px_rgba(224,185,59,0.35)]"
      />
      <div className="relative mx-auto flex h-full max-w-[1200px] items-center px-6">
        <div className="relative w-full">
          <h2 className={`dia invisible text-ink opacity-0 ${TITOL}`}>De dia, el kākāpō dorm.</h2>
          <h2 className={`nit-text absolute top-0 left-0 text-bone ${TITOL}`}>De nit, surt a buscar.</h2>
        </div>
      </div>
    </section>
  )
}
