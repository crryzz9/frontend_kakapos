import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import DiaNit from '../components/home/DiaNit.jsx'
import Colleccio from '../components/home/Colleccio.jsx'
import Tancament from '../components/home/Tancament.jsx'
import { useProductes } from '../hooks/useProductes.js'
import { ScrollTrigger, useGSAP } from '../animacio.js'

function Home() {
  const productes = useProductes()
  const location = useLocation()

  // Los hijos crean sus ScrollTriggers antes que el padre (Hero, DiaNit, Colleccio, Tancament:
  // orden de la página). Cuando cambian los productos, Colleccio y Tancament los recrean
  // y aquí se recalculan todas las posiciones.
  useGSAP(() => ScrollTrigger.refresh(), { dependencies: [productes.productes] })

  // Enlaces a /#col (nav y hero): scroll cuando la colección ya tiene su altura final.
  // location.key cambia en cada clic, aunque el hash ya fuera #col.
  useEffect(() => {
    if (location.hash === '#col' && productes.estat !== 'carregant') {
      document.getElementById('col')?.scrollIntoView()
    }
  }, [location.hash, location.key, productes.estat])

  // overflow-x-clip (no hidden): recorta igual pero no crea un contenedor de scroll,
  // que daría problemas con los pines de ScrollTrigger.
  return (
    <main className="overflow-x-clip">
      <Hero />
      <DiaNit />
      <Colleccio {...productes} />
      <Tancament productes={productes.productes} />
    </main>
  )
}

export default Home
