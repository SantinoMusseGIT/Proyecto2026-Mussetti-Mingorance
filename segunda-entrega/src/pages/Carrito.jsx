import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import useCarrito from '@/hooks/useCarrito'

const formateadorPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function Carrito() {
  const navigate = useNavigate()
  const {
    carrito,
    cantidadTotal,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito()

  const total = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0,
  )

  if (carrito.length === 0) {
    return (
      <section className="pagina carrito-vacio">
        <h1>Mi carrito (0 productos)</h1>
        <p>Tu carrito está vacío.</p>

        <Button onClick={() => navigate('/catalogo')}>
          Ver el catálogo
        </Button>
      </section>
    )
  }

  return (
    <section className="pagina carrito">
      <div className="carrito__encabezado">
        <div>
          <p className="carrito__subtitulo">Resumen de compra</p>
          <h1>Mi carrito ({cantidadTotal} productos)</h1>
        </div>

        <Button variant="secondary" onClick={() => navigate('/catalogo')}>
          Seguir comprando
        </Button>
      </div>

      <div className="carrito__columnas">
        <div className="carrito__productos">
          {carrito.map((producto) => {
            const imagenUrl =
              `${import.meta.env.BASE_URL}productos/${producto.imagen}`

            return (
              <article className="item-carrito" key={producto.id}>
                <img
                  className="item-carrito__imagen"
                  src={imagenUrl}
                  alt={producto.nombre}
                />

                <div className="item-carrito__informacion">
                  <h2>{producto.nombre}</h2>
                  <p>{producto.marca}</p>
                  <p className="item-carrito__precio">
                    {formateadorPrecio.format(producto.precio)}
                  </p>
                </div>

                <div className="item-carrito__cantidad">
                  <label
                    className="solo-lectores"
                    htmlFor={`cantidad-${producto.id}`}
                  >
                    Cantidad de {producto.nombre}
                  </label>

                  <Button
                    variant="secondary"
                    className="item-carrito__control"
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad - 1)
                    }
                  >
                    −
                  </Button>

                  <input
                    id={`cantidad-${producto.id}`}
                    type="number"
                    min="1"
                    step="1"
                    value={producto.cantidad}
                    onChange={(evento) =>
                      cambiarCantidad(producto.id, evento.target.value)
                    }
                  />

                  <Button
                    variant="secondary"
                    className="item-carrito__control"
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad + 1)
                    }
                  >
                    +
                  </Button>
                </div>

                <p className="item-carrito__subtotal">
                  {formateadorPrecio.format(
                    producto.precio * producto.cantidad,
                  )}
                </p>

                <Button
                  variant="danger"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </Button>
              </article>
            )
          })}
        </div>

        <aside className="resumen-carrito" aria-label="Resumen del carrito">
          <h2>Resumen</h2>

          <div className="resumen-carrito__fila">
            <span>Productos</span>
            <span>{cantidadTotal}</span>
          </div>

          <div className="resumen-carrito__fila resumen-carrito__total">
            <span>Total</span>
            <strong>{formateadorPrecio.format(total)}</strong>
          </div>

          <Button
            variant="danger"
            className="resumen-carrito__vaciar"
            onClick={vaciarCarrito}
          >
            Vaciar carrito
          </Button>
        </aside>
      </div>
    </section>
  )
}

export default Carrito