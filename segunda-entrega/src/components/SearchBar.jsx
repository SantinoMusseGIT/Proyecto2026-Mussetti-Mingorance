import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const buscarProductos = (evento) => {
    evento.preventDefault()
    const termino = busqueda.trim()

    if (termino === '') {
      navigate('/catalogo')
      return
    }

    navigate(`/catalogo?busqueda=${encodeURIComponent(termino)}`)
  }

  return (
    <form
      className="buscador"
      role="search"
      onSubmit={buscarProductos}
    >
      <label className="solo-lectores" htmlFor="busqueda-general">
        Buscar productos o marcas
      </label>

      <input
        id="busqueda-general"
        type="search"
        value={busqueda}
        placeholder="Buscar productos o marcas..."
        onChange={(evento) => setBusqueda(evento.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar