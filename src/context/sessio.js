import { createContext, useContext } from 'react'

// Contexto y hook en un archivo .js separado del componente: así el Fast Refresh de Vite
// no se queja (regla react-refresh/only-export-components).
export const SessioContext = createContext(null)

export function useSessio() {
  const sessio = useContext(SessioContext)
  if (!sessio) throw new Error('useSessio s’ha d’utilitzar dins de <SessioProvider>')
  return sessio
}
