import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PanellAuth from '../components/PanellAuth.jsx'
import Camp from '../components/Camp.jsx'
import { useSessio } from '../context/sessio.js'
import { useErrorsFormulari } from '../hooks/useErrorsFormulari.js'
import { validarLogin, errorsDeApi } from '../utils/validacio.js'

function Login() {
  const { iniciarSessio } = useSessio()
  const navigate = useNavigate()
  const { errors, general, mostrar, netejar } = useErrorsFormulari()
  const [enviant, setEnviant] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    const form = e.currentTarget
    const dades = Object.fromEntries(new FormData(form))
    const credencials = { email: dades.email.trim(), password: dades.password }

    if (mostrar(form, validarLogin(credencials))) return

    setEnviant(true)
    try {
      await iniciarSessio(credencials)
      navigate('/')
    } catch (err) {
      setEnviant(false)
      // 401: no se dice cuál de los dos falla, para no revelar qué emails existen
      if (err.status === 401) return mostrar(form, {}, 'Email o contrasenya incorrectes')
      const { camps, general } = errorsDeApi(err)
      mostrar(form, camps, general)
    }
  }

  return (
    <PanellAuth
      titol="Entra"
      lema="Torna al niu"
      frase="El kākāpō surt de nit. Tu pots entrar quan vulguis."
    >
      <form onSubmit={enviar} onInput={netejar} noValidate className="flex flex-col gap-5">
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
          autoComplete="current-password"
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
          {enviant ? 'Entrant…' : 'Entrar'}
        </button>
      </form>

      <p className="mt-8 text-moss">
        Encara no tens compte?{' '}
        <Link to="/register" className="font-bold text-ink underline underline-offset-4">
          Crea'n un
        </Link>
      </p>
    </PanellAuth>
  )
}

export default Login
