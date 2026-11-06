import { Link } from 'react-router-dom'
import portadaTaller from '@/assets/portada-taller.png'

function Inicio() {
  return (
    <section className="portada">
      <img
        className="portada__imagen"
        src={portadaTaller}
        alt="Automóvil deportivo dentro de un taller"
      />

      <div className="portada__contenido">
        <p className="portada__subtitulo">Performance automotriz</p>

        <h1>
          El sonido de tu
          <span>pasión</span>
        </h1>

        <p className="portada__descripcion">
          Escapes y performance en un solo lugar.
        </p>

        <Link className="boton-principal" to="/catalogo">
          Ver productos
        </Link>
      </div>
    </section>
  )
}

export default Inicio