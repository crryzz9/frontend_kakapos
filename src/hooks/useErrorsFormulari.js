import { useState } from 'react'
import { flushSync } from 'react-dom'

// Errores de un formulario: por campo y uno general.
// mostrar() pinta los errores y mueve el foco al primer campo con error,
// para que el lector de pantalla lea su etiqueta y su mensaje (aria-describedby).
export function useErrorsFormulari() {
  const [errors, setErrors] = useState({})
  const [general, setGeneral] = useState('')

  function mostrar(form, camps = {}, missatgeGeneral = '') {
    // flushSync: el mensaje tiene que estar en el DOM antes de mover el foco
    flushSync(() => {
      setErrors(camps)
      setGeneral(missatgeGeneral)
    })
    const primer = Object.keys(camps)[0]
    if (primer) form.elements[primer]?.focus()
    return Boolean(primer || missatgeGeneral)
  }

  // Al escribir en un campo con error, el error de ese campo desaparece
  // (no se valida en cada tecla: se vuelve a validar al enviar)
  function netejar(e) {
    const camp = e.target.name
    if (errors[camp]) setErrors((anteriors) => ({ ...anteriors, [camp]: undefined }))
  }

  return { errors, general, mostrar, netejar }
}
