import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PanellAuth from '../components/PanellAuth.jsx'
import Camp from '../components/Camp.jsx'
import { registrar } from '../api/usuaris.js'
import { useSessio } from '../context/sessio.js'
import { useErrorsFormulari } from '../hooks/useErrorsFormulari.js'
import { validarRegistre, errorsDeApi } from '../utils/validacio.js'

function Register() {
  const { iniciarSessio } = useSessio()
  const navigate = useNavigate()
  const { errors, general, mostrar, netejar } = useErrorsFormulari()
  const [enviant, setEnviant] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    const form = e.currentTarget
    const dades = Object.fromEntries(new FormData(form))
    const usuari = { nom: dades.nom.trim(), email: dades.email.trim(), password: dades.password }

    if (mostrar(form, validarRegistre(usuari))) return

    setEnviant(true)
    try {
      await registrar(usuari)
    } catch (err) {
      setEnviant(false)
      if (err.status === 409) return mostrar(form, { email: 'Aquest email ja està registrat' })
      const { camps, general } = errorsDeApi(err)
      return mostrar(form, camps, general)
    }

    // El compte ja existeix: entrem automàticament
    try {
      await iniciarSessio({ email: usuari.email, password: usuari.password })
      navigate('/')
    } catch {
      setEnviant(false)
      mostrar(form, {}, "El compte s'ha creat, però no s'ha pogut iniciar la sessió. Prova-ho des d'Entrar.")
    }
  }

  return (
    <PanellAuth
      titol="Crea el teu compte"
      lema="Benvingut al niu"
      frase="No vola, però camina quilòmetres cada nit. Fes el primer pas."
    >
      <form onSubmit={enviar} onInput={netejar} noValidate className="flex flex-col gap-5">
        <Camp id="nom" etiqueta="Nom" autoComplete="name" error={errors.nom} />
        <Camp
          id="email"
          etiqueta="Email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          autoCapitalize="none"
          error={errors.email}
        />
        <Camp
          id="password"
          etiqueta="Contrasenya"
          type="password"
          autoComplete="new-password"
          ajuda="Entre 12 i 72 caràcters."
          error={errors.password}
        />

        <div aria-live="assertive">
          {general && <p className="rounded-xl border border-ink bg-bone px-4 py-3 font-bold">{general}</p>}
        </div>

        <button
          type="submit"
          disabled={enviant}
          className="h-[52px] w-full rounded-full bg-accent font-bold text-ink decoration-2 underline-offset-4 hover:underline disabled:cursor-wait"
        >
          {enviant ? 'Creant el compte…' : 'Crear compte'}
        </button>
      </form>

      <p className="mt-8 text-moss">
        Ja tens compte?{' '}
        <Link to="/login" className="font-bold text-ink underline underline-offset-4">
          Entra
        </Link>
      </p>
    </PanellAuth>
  )
}

export default Register
