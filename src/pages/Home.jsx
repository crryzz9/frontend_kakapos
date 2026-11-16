const productes = [
  { id: 1, nom: 'Samarreta de manigues llargues Kakapos', categoria: 'Samarretes', preu: 29.99 },
  { id: 2, nom: 'Samarreta de tirants Kakapos', categoria: 'Samarretes', preu: 12.99 },
  { id: 3, nom: 'Gorra Kakapos Clàssica', categoria: 'Gorres', preu: 14.95 },
  { id: 4, nom: 'Gorra Kakapos x New Era', categoria: 'Gorres', preu: 34.95 },
  { id: 5, nom: 'Tassa Kakapos Clàssica', categoria: 'Tasses', preu: 6.9 },
  { id: 6, nom: 'Tassa Espresso Kakapos', categoria: 'Tasses', preu: 5.5 },
]

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Kakapos Shop</h1>
      <h2 className="mb-4 text-lg">Productes destacats</h2>
      <ul className="grid grid-cols-2 gap-4">
        {productes.map((p) => (
          <li key={p.id} className="rounded border p-4">
            <strong>{p.nom}</strong> · {p.categoria} · {p.preu.toFixed(2)} €
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home