import { Link } from 'react-router-dom'
import portadaTaller from '@/assets/portada-taller.png'

const beneficios = [
  {
    icono: '🚚',
    titulo: 'Envíos a todo el país',
    descripcion: 'Rápidos y seguros',
  },
  {
    icono: '💳',
    titulo: 'Hasta 12 cuotas',
    descripcion: 'Sin interés',
  },
  {
    icono: '🔒',
    titulo: 'Compra protegida',
    descripcion: 'Tu seguridad es nuestra prioridad',
  },
  {
    icono: '🛠️',
    titulo: 'Asesoramiento experto',
    descripcion: 'Estamos para ayudarte',
  },
]

const categorias = [
  {
    nombre: 'Escapes',
    valor: 'escapes',
    imagen: 'escape-deportivo.png',
  },
  {
    nombre: 'Admisión',
    valor: 'admision',
    imagen: 'filtro-aire.png',
  },
  {
    nombre: 'Suspensión',
    valor: 'suspension',
    imagen: 'suspension-deportiva.png',
  },
  {
    nombre: 'Frenos',
    valor: 'frenos',
    imagen: 'discos-freno.png',
  },
  {
    nombre: 'Reprogramación',
    valor: 'reprogramacion',
    imagen: 'fueltech-ecu.png',
  },
  {
    nombre: 'Accesorios',
    valor: 'accesorios',
    imagen: 'volante-momo.png',
  },
]

function Inicio() {
  return (
    <>
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

      <section className="beneficios" aria-label="Beneficios de compra">
        {beneficios.map((beneficio) => (
          <article className="beneficio" key={beneficio.titulo}>
            <span className="beneficio__icono" aria-hidden="true">
              {beneficio.icono}
            </span>

            <div>
              <h2>{beneficio.titulo}</h2>
              <p>{beneficio.descripcion}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="categorias-destacadas">
        <div className="categorias-destacadas__encabezado">
          <div>
            <p className="categorias-destacadas__subtitulo">
              Encontrá lo que buscás
            </p>
            <h2>Categorías destacadas</h2>
          </div>

          <Link to="/catalogo">Ver todas →</Link>
        </div>

        <div className="categorias-destacadas__grilla">
          {categorias.map((categoria) => {
            const imagenUrl =
              `${import.meta.env.BASE_URL}productos/${categoria.imagen}`

            return (
              <Link
                className="categoria-destacada"
                key={categoria.valor}
                to={`/catalogo?categoria=${categoria.valor}`}
              >
                <img src={imagenUrl} alt="" />

                <span className="categoria-destacada__sombra" />

                <span className="categoria-destacada__contenido">
                  <strong>{categoria.nombre}</strong>
                  <span>Ver productos →</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Inicio