import PropTypes from 'prop-types'
import Button from '@/components/Button'
import useCarrito from '@/hooks/useCarrito'

const formateadorPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito()
  const imagenUrl = `${import.meta.env.BASE_URL}productos/${producto.imagen}`

  return (
    <article className="producto-card">
      <img
        className="producto-card__imagen"
        src={imagenUrl}
        alt={producto.nombre}
        loading="lazy"
      />

      <div className="producto-card__contenido">
        <p className="producto-card__categoria">{producto.categoria}</p>
        <h2>{producto.nombre}</h2>
        <p className="producto-card__marca">Marca: {producto.marca}</p>
        <p>{producto.descripcion}</p>

        <p className="producto-card__precio">
          {formateadorPrecio.format(producto.precio)}
        </p>

        <Button
          className="producto-card__boton"
          onClick={() => agregarProducto(producto)}
        >
          Agregar al carrito
        </Button>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductCard