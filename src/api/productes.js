import { apiFetch } from './client.js'

// Devuelve un array de productos con categoriaId populado ({ _id, nom, slug }). Sin paginación.
export const llistarProductes = () => apiFetch('/api/productes')
