import { useEffect, useState } from 'react'
import { llistarProductes } from '../api/productes.js'

// Carga los productos de la API. estat: 'carregant' | 'ok' | 'error'
export function useProductes() {
  const [dades, setDades] = useState({ estat: 'carregant', productes: [], error: null })
  const [intent, setIntent] = useState(0) // cambiarlo vuelve a lanzar la petición

  useEffect(() => {
    let actiu = true // evita actualizar el estado si el componente ya se ha desmontado
    llistarProductes()
      .then((productes) => actiu && setDades({ estat: 'ok', productes, error: null }))
      .catch((error) => actiu && setDades({ estat: 'error', productes: [], error }))
    return () => {
      actiu = false
    }
  }, [intent])

  function tornarAProvar() {
    setDades({ estat: 'carregant', productes: [], error: null })
    setIntent((n) => n + 1)
  }

  return { ...dades, tornarAProvar }
}
