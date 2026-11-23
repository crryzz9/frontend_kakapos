// Cliente HTTP único: todas las peticiones a la API pasan por aquí.
const URL_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

// Error con la misma forma que el del backend: { status, code, message, details }
export class ApiError extends Error {
  constructor(status, code, message, details = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export async function apiFetch(ruta, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let resposta
  try {
    resposta = await fetch(`${URL_BASE}${ruta}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    // fetch solo falla así cuando no hay respuesta (API parada, sin red, CORS)
    throw new ApiError(0, 'NETWORK_ERROR', "No s'ha pogut connectar amb el servidor. Torna-ho a provar d'aquí a una estona.")
  }

  if (resposta.status === 204) return null

  const json = await resposta.json().catch(() => null)

  if (!resposta.ok || !json?.success) {
    const error = json?.error ?? {}
    throw new ApiError(
      resposta.status,
      error.code ?? 'UNKNOWN_ERROR',
      error.message ?? 'Hi ha hagut un error inesperat.',
      error.details ?? [],
    )
  }

  return json.data
}
