import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <section className="pagina">
      <h1>Página no encontrada</h1>
      <p>La dirección que ingresaste no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrada