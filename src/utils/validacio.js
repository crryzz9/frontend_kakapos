// Mismas reglas que el backend (modelo Usuari y usuariService), con mensajes en catalán.
// Se usan en el cliente y para traducir los details de un 422 (Mongoose responde en inglés).
export const MISSATGES = {
  nom: 'El nom ha de tenir entre 2 i 50 caràcters.',
  email: 'Escriu un email vàlid, per exemple nom@exemple.cat.',
  password: 'La contrasenya ha de tenir entre 12 i 72 caràcters.',
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validarRegistre({ nom, email, password }) {
  const errors = {}
  if (nom.length < 2 || nom.length > 50) errors.nom = MISSATGES.nom
  if (!EMAIL.test(email)) errors.email = MISSATGES.email
  if (password.length < 12 || password.length > 72) errors.password = MISSATGES.password
  return errors
}

export function validarLogin({ email, password }) {
  const errors = {}
  if (!EMAIL.test(email)) errors.email = MISSATGES.email
  if (!password) errors.password = 'Escriu la contrasenya.'
  return errors
}

// Convierte un ApiError en { camps, general }: los details de campos conocidos van junto
// al campo; el resto (y los errores sin details, como no hay conexión) va al aviso general.
export function errorsDeApi(err) {
  const camps = {}
  let general = ''
  for (const { field, message } of err.details ?? []) {
    if (field in MISSATGES) camps[field] = MISSATGES[field]
    else general = message
  }
  if (!general && Object.keys(camps).length === 0) general = err.message
  return { camps, general }
}
