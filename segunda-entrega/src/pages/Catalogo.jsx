import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obtenerProductos } from '@/api/productos'
import ProductCard from '@/components/ProductCard'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [categoria, setCategoria] = useState('todas')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [parametrosBusqueda] = useSearchParams()

  const terminoBusqueda =
    parametrosBusqueda.get('busqueda')?.trim().toLowerCase() ?? ''

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

  const productosFiltrados = useMemo(
    () =>
      productos.filter((producto) => {
        const coincideCategoria =
          categoria === 'todas' || producto.categoria === categoria

        const textoProducto =
          `${producto.nombre} ${producto.marca} ${producto.descripcion}`.toLowerCase()

        const coincideBusqueda =
          terminoBusqueda === '' || textoProducto.includes(terminoBusqueda)

        return coincideCategoria && coincideBusqueda
      }),
    [categoria, productos, terminoBusqueda],
  )

  return (
    <section className="pagina catalogo">
      <div className="catalogo__encabezado">
        <div>
          <p className="catalogo__subtitulo">Productos disponibles</p>
          <h1>Catálogo de productos</h1>
        </div>

        {!cargando && !error && (
          <p aria-live="polite">
            {productosFiltrados.length} productos
          </p>
        )}
      </div>

      {!cargando && !error && (
        <div className="catalogo__filtros">
          <div>
            <label htmlFor="filtro-categoria">Filtrar por categoría</label>
            <select
              id="filtro-categoria"
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              <option value="todas">Todas las categorías</option>
              <option value="escapes">Escapes</option>
              <option value="admision">Admisión</option>
              <option value="suspension">Suspensión</option>
              <option value="frenos">Frenos</option>
              <option value="reprogramacion">Reprogramación</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>

          {terminoBusqueda !== '' && (
            <p>
              Resultados para: <strong>{terminoBusqueda}</strong>
            </p>
          )}
        </div>
      )}

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

      {!cargando && !error && productosFiltrados.length === 0 && (
        <p className="mensaje-estado" role="status">
          No se encontraron productos con esos filtros.
        </p>
      )}

      {!cargando && !error && productosFiltrados.length > 0 && (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Catalogo