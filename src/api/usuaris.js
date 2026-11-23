import { apiFetch } from './client.js'

// Body exacto que acepta el backend: cualquier campo extra da 400 FIELD_NOT_ALLOWED
export const registrar = ({ nom, email, password }) =>
  apiFetch('/api/usuaris/registre', { method: 'POST', body: { nom, email, password } })

// Devuelve { accessToken, refreshToken, usuari }
export const login = ({ email, password }) =>
  apiFetch('/api/usuaris/login', { method: 'POST', body: { email, password } })

// Invalida el refresh token en el servidor (responde 204 → null)
export const logout = (refreshToken) =>
  apiFetch('/api/usuaris/logout', { method: 'POST', body: { refreshToken } })
