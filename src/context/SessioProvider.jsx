import { useState } from 'react'
import { SessioContext } from './sessio.js'
import { login, logout } from '../api/usuaris.js'

const CLAU = 'sessio'

// localStorage puede lanzar (modo privado, almacenamiento bloqueado): siempre con try/catch
function llegirSessio() {
  try {
    const sessio = JSON.parse(localStorage.getItem(CLAU))
    return sessio?.usuari ? sessio : null
  } catch {
    return null
  }
}

function desarSessio(sessio) {
  try {
    if (sessio) localStorage.setItem(CLAU, JSON.stringify(sessio))
    else localStorage.removeItem(CLAU)
  } catch {
    // Sin almacenamiento la sesión dura hasta recargar la página
  }
}

export default function SessioProvider({ children }) {
  // { accessToken, refreshToken, usuari } o null. Se lee solo una vez, al montar.
  const [sessio, setSessio] = useState(llegirSessio)

  // Si el login falla, el ApiError llega a la página para que muestre el mensaje
  async function iniciarSessio(credencials) {
    const dades = await login(credencials)
    desarSessio(dades)
    setSessio(dades)
  }

  async function tancarSessio() {
    const refreshToken = sessio?.refreshToken
    // Primero se borra la sesión local: el usuario sale aunque el servidor no responda
    desarSessio(null)
    setSessio(null)
    if (refreshToken) await logout(refreshToken).catch(() => {})
  }

  return (
    <SessioContext.Provider value={{ usuari: sessio?.usuari ?? null, iniciarSessio, tancarSessio }}>
      {children}
    </SessioContext.Provider>
  )
}
