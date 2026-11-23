import { useRef } from 'react'
import TargetaProducte from './TargetaProducte.jsx'
import { gsap, useGSAP, AMB_MOVIMENT } from '../../animacio.js'

export default function Colleccio({ estat, productes, error, tornarAProvar }) {
  const seccio = useRef(null)
  const hiHaProductes = estat === 'ok' && productes.length > 0

  // Se recrea cada vez que cambian los productos (llegan de forma asíncrona).
  // revertOnUpdate: deshace el pin y las animaciones anteriores antes de crear las nuevas.
  useGSAP(
    () => {
      if (!hiHaProductes) return // vacío o error: sin scroll horizontal
      const mm = gsap.matchMedia()
      mm.add(
        AMB_MOVIMENT,
        () => {
          const pista = seccio.current.querySelector('.pista')
          const distancia = () => Math.max(0, pista.scrollWidth - window.innerWidth)
          // El scroll lo hace GSAP, no el usuario. visible (no hidden) para no recortar las
          // tarjetas mientras entran giradas y desplazadas; ya recorta la sección.
          gsap.set('.pista-caixa', { overflow: 'visible' })

          // ease "none" obligatorio: 1 px de scroll vertical = 1 px de desplazamiento horizontal
          const lliscament = gsap.to(pista, {
            x: () => -distancia(),
            ease: 'none',
            scrollTrigger: {
              trigger: seccio.current,
              start: 'top top',
              end: () => '+=' + distancia(),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true, // recalcula distancia() al redimensionar
            },
          })
          gsap.fromTo(
            '.barra',
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: seccio.current,
                start: 'top top',
                end: () => '+=' + distancia(),
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          )
          // Cada tarjeta entra girando según su posición horizontal (containerAnimation)
          gsap.utils.toArray('.targeta', seccio.current).forEach((targeta) => {
            gsap.from(targeta, {
              rotation: 6,
              y: 80,
              ease: 'none',
              scrollTrigger: {
                trigger: targeta,
                containerAnimation: lliscament,
                start: 'left right',
                end: 'left 65%',
                scrub: true,
              },
            })
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
      id="col"
      // Con productos: alto de la pantalla (máx. 860px del prototipo) para que, fijada, se vea entera.
      // pb-20 reserva el espacio de la barra de progreso debajo de las tarjetas.
      className={`colleccio zona-fosca relative overflow-hidden bg-ink text-bone ${hiHaProductes ? 'flex h-dvh max-h-[860px] min-h-[600px] flex-col pb-20' : 'pb-[120px]'}`}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-end justify-between gap-4 px-6 pt-[clamp(88px,12dvh,120px)]">
        <h2 className="text-[clamp(40px,5vw,64px)] leading-[1.1] font-extrabold tracking-[-0.035em]">
          La col·lecció
        </h2>
        {hiHaProductes && <p className="text-base text-lichen-light">Fes scroll per recórrer-la.</p>}
      </div>

      {/* Estados: región viva para que el lector de pantalla anuncie el cambio */}
      <div aria-live="polite" className="mx-auto max-w-[1200px] px-6">
        {estat === 'carregant' && <p className="mt-12 text-lg text-lichen-light">Carregant productes…</p>}
        {estat === 'ok' && productes.length === 0 && (
          <p className="mt-12 text-lg text-lichen-light">Encara no hi ha productes.</p>
        )}
        {estat === 'error' && (
          <div className="mt-12 flex flex-col items-start gap-5">
            <p className="max-w-[60ch] text-lg">{error.message}</p>
            <button
              type="button"
              onClick={tornarAProvar}
              className="inline-flex h-11 items-center rounded-full border border-bone px-5 font-bold hover:text-lichen-light"
            >
              Tornar-ho a provar
            </button>
          </div>
        )}
      </div>

      {/* Solo con productos hay fila horizontal. Por defecto, scroll nativo (estado de «reducir movimiento»). */}
      {hiHaProductes && (
        <>
          <div className="pista-caixa my-auto overflow-x-auto">
            <div className="pista flex w-max gap-8 px-6 py-6 md:px-20">
              {productes.map((producte, i) => (
                <TargetaProducte key={producte._id} producte={producte} index={i} />
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-x-6 bottom-14 h-1 rounded bg-ink2 motion-reduce:hidden md:inset-x-20">
            <div className="barra h-full origin-left rounded bg-accent" />
          </div>
        </>
      )}
    </section>
  )
}
