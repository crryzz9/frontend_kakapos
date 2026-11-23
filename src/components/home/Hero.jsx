import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, AMB_MOVIMENT } from '../../animacio.js'

const LLETRES = [...'Kakapos']
const FRANJA = ['Samarretes', 'Gorres', 'Tasses', 'Samarretes', 'Gorres', 'Tasses', 'Samarretes', 'Gorres', 'Tasses']

export default function Hero() {
  const seccio = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        AMB_MOVIMENT,
        () => {
          // Entrada: las letras suben desde dentro de su caja (overflow hidden), luego frase y franja
          gsap
            .timeline({ defaults: { ease: 'power4.out' } })
            .from('.lletra', { yPercent: 115, duration: 1.1, stagger: 0.06 })
            .from('.hero-sub', { y: 24, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
            .from('.franja-caixa', { yPercent: 100, duration: 0.9 }, '-=0.8')

          // Con el scroll, cada letra sube a una velocidad distinta (3 ritmos)
          gsap.to('.lletra-caixa', {
            y: (i) => -(60 + (i % 3) * 80),
            ease: 'none',
            scrollTrigger: { trigger: seccio.current, start: 'top top', end: 'bottom top', scrub: 1 },
          })
          // La franja se desliza hacia la izquierda
          gsap.fromTo(
            '.franja',
            { xPercent: 0 },
            {
              xPercent: -35,
              ease: 'none',
              scrollTrigger: { trigger: seccio.current, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        },
        seccio,
      )
    },
    { scope: seccio },
  )

  return (
    <section ref={seccio} className="hero relative h-[900px] overflow-hidden bg-paper">
      <div className="relative mx-auto max-w-[1200px] px-6 pt-[190px]">
        {/* El lector de pantalla lee «Kakapos» entero; las letras sueltas van ocultas */}
        <h1
          aria-label="Kakapos"
          className="text-[clamp(56px,17vw,250px)] leading-[0.86] font-extrabold tracking-[-0.06em] whitespace-nowrap"
        >
          {LLETRES.map((lletra, i) => (
            <span key={i} aria-hidden="true" className="lletra-caixa">
              <span className="lletra inline-block">{lletra}</span>
            </span>
          ))}
        </h1>

        <div className="hero-sub mt-11 flex max-w-[980px] flex-wrap items-end justify-between gap-8">
          <p className="max-w-[40ch] text-xl leading-[1.55] text-moss">
            Samarretes, gorres i tasses inspirades en el kākāpō, el lloro que no vola i surt de nit.
          </p>
          <Link
            to="/#col"
            className="inline-flex h-14 items-center rounded-full bg-accent px-7 font-bold decoration-2 underline-offset-4 hover:underline"
          >
            Veure la col·lecció
          </Link>
        </div>
        <p className="hero-sub mt-16 text-sm font-semibold text-moss">Fes scroll</p>
      </div>

      {/* Franja decorativa: repite las categorías, así que se oculta a lectores de pantalla */}
      <div
        aria-hidden="true"
        className="franja-caixa absolute inset-x-0 bottom-0 flex h-[132px] items-center overflow-hidden bg-ink"
      >
        <div className="franja flex w-max items-center gap-10 pl-10 text-[64px] font-extrabold tracking-[-0.04em] whitespace-nowrap text-bone">
          {FRANJA.map((paraula, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {paraula}
              <svg width="18" height="18" viewBox="0 0 18 18" focusable="false">
                <circle cx="9" cy="9" r="9" className="fill-accent" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
