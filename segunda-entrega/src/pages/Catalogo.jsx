import { useEffect, useState } from 'react'
import { obtenerProductos } from '@/api/productos'
import ProductCard from '@/components/ProductCard'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let componenteActivo = true

    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos()

        if (componenteActivo) {
          setProductos(datos)
        }
      } catch (errorPeticion) {
        if (componenteActivo) {
          setError(errorPeticion.message)
        }
      } finally {
        if (componenteActivo) {
          setCargando(false)
        }
      }
    }

    cargarProductos()

    return () => {
      componenteActivo = false
    }
  }, [])

  return (
    <section className="pagina catalogo">
      <div className="catalogo__encabezado">
        <div>
          <p className="catalogo__subtitulo">Productos disponibles</p>
          <h1>Catálogo de productos</h1>
        </div>

        {!cargando && !error && (
          <p aria-live="polite">{productos.length} productos</p>
        )}
      </div>

      {cargando && (
        <p className="mensaje-estado" role="status">
          Cargando productos...
        </p>
      )}

      {error && (
        <p className="mensaje-estado mensaje-estado--error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Catalogo