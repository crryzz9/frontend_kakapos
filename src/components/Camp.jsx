// Campo de formulario accesible: label real, ayuda y error enlazados con aria-describedby
export default function Camp({ id, etiqueta, ajuda, error, ...props }) {
  const idAjuda = `${id}-ajuda`
  const idError = `${id}-error`
  const descripcio = [ajuda && idAjuda, error && idError].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold">
        {etiqueta}
      </label>
      {ajuda && (
        <p id={idAjuda} className="text-sm text-moss">
          {ajuda}
        </p>
      )}
      <input
        id={id}
        name={id}
        required // todos los campos de esta sesión son obligatorios (noValidate evita las burbujas del navegador)
        aria-invalid={error ? true : undefined}
        aria-describedby={descripcio}
        className="h-12 rounded-xl border border-moss bg-bone px-4 text-base text-ink aria-invalid:border-ink aria-invalid:ring-1 aria-invalid:ring-ink"
        {...props}
      />
      {error && (
        <p id={idError} className="border-l-4 border-ink pl-2 text-sm font-bold">
          {error}
        </p>
      )}
    </div>
  )
}
