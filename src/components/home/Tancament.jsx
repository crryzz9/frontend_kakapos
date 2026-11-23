import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, AMB_MOVIMENT } from '../../animacio.js'

// productes: solo se usa como dependencia. Cuando cambia la colección cambia su pin,
// así que estos triggers se recrean después de los de Colleccio (orden de la página).
export default function Tancament({ productes }) {
  const seccio = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        AMB_MOVIMENT,
        () => {
          // El «Kakapos» gigante se desliza mientras la sección entra en pantalla
          gsap.fromTo(
            '.contorn',
            { xPercent: 4 },
            {
              xPercent: -18,
              ease: 'none',
              scrollTrigger: { trigger: seccio.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
            },
          )
          // Título y botones aparecen una vez (sin scrub)
          gsap.from('.tancament-l', {
            y: 60,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: seccio.current, start: 'top 70%' },
          })
        },
        seccio,
      )
    },
    { scope: seccio, dependencies: [productes], revertOnUpdate: true },
  )

  return (
    <section
      ref={seccio}
      className="tancament zona-fosca relative h-[680px] overflow-hidden bg-ink text-bone"
    >
      {/* «Kakapos» gigante decorativo en ink2: no es texto que haya que leer */}
      <div
        aria-hidden="true"
        className="contorn absolute -bottom-10 left-0 text-[300px] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-ink2"
      >
        Kakapos Kakapos
      </div>

      <div className="relative mx-auto max-w-[1200px] px-6 pt-[140px]">
        <h2
          className="tancament-l max-w-[16ch] text-[clamp(40px,5.4vw,76px)] leading-[1.02] font-extrabold tracking-[-0.04em]"
        >
          Crea el teu compte i sigues el primer a saber quan arriben peces noves.
        </h2>
        <div className="tancament-l mt-11 flex flex-wrap items-center gap-6">
          <Link
            to="/register"
            className="inline-flex h-14 items-center rounded-full bg-accent px-7 font-bold text-ink decoration-2 underline-offset-4 hover:underline"
          >
            Crear compte
          </Link>
          <Link to="/login" className="font-bold text-bone underline underline-offset-4 hover:text-lichen-light">
            Ja tinc compte
          </Link>
        </div>
      </div>
    </section>
  )
}
