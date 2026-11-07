import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obtenerProductos } from '@/api/productos'
import ProductCard from '@/components/ProductCard'

const categoriasValidas = [
  'escapes',
  'admision',
  'suspension',
  'frenos',
  'reprogramacion',
  'accesorios',
]

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [parametrosBusqueda, setParametrosBusqueda] = useSearchParams()

  const busqueda = parametrosBusqueda.get('busqueda') ?? ''
  const terminoBusqueda = busqueda.trim().toLowerCase()

  const categoriaParametro =
    parametrosBusqueda.get('categoria') ?? 'todas'

  const categoria = categoriasValidas.includes(categoriaParametro)
    ? categoriaParametro
    : 'todas'

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

  const actualizarParametro = (nombre, valor) => {
    const nuevosParametros = new URLSearchParams(parametrosBusqueda)

    if (valor.trim() === '' || valor === 'todas') {
      nuevosParametros.delete(nombre)
    } else {
      nuevosParametros.set(nombre, valor)
    }

    setParametrosBusqueda(nuevosParametros)
  }

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
        <h1>Catálogo de productos</h1>

        {!cargando && !error && (
          <p aria-live="polite">
            {productosFiltrados.length} resultados
          </p>
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
        <div className="catalogo__contenido">
          <aside
            className="catalogo__filtros"
            aria-label="Filtros del catálogo"
          >
            <h2>Filtros</h2>

            <div className="catalogo__campo">
              <label htmlFor="filtro-categoria">Categoría</label>

              <select
                id="filtro-categoria"
                value={categoria}
                onChange={(evento) =>
                  actualizarParametro('categoria', evento.target.value)
                }
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

            <div className="catalogo__campo">
              <label htmlFor="buscar-producto">Buscar producto</label>

              <input
                id="buscar-producto"
                type="search"
                value={busqueda}
                placeholder="Ejemplo: escape deportivo"
                onChange={(evento) =>
                  actualizarParametro('busqueda', evento.target.value)
                }
              />
            </div>

            {terminoBusqueda !== '' && (
              <p className="catalogo__busqueda-activa">
                Resultados para: <strong>{busqueda}</strong>
              </p>
            )}
          </aside>

          <div className="catalogo__resultados">
            <h2>Productos disponibles</h2>

            {productosFiltrados.length === 0 ? (
              <p className="mensaje-estado" role="status">
                No se encontraron productos con esos filtros.
              </p>
            ) : (
              <div className="productos-grid">
                {productosFiltrados.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Catalogo