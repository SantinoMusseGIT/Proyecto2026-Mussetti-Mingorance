import { Link, NavLink, Outlet } from 'react-router-dom'
import SearchBar from '@/components/SearchBar'
import useCarrito from '@/hooks/useCarrito'

const logoUrl = `${import.meta.env.BASE_URL}logo-escape-libre.png`

const obtenerClaseEnlace = ({ isActive }) =>
  isActive ? 'menu__enlace menu__enlace--activo' : 'menu__enlace'

function Layout() {
  const { cantidadTotal } = useCarrito()

  return (
    <div className="aplicacion">
      <header className="cabecera">
        <div className="cabecera__contenido">
          <Link className="marca" to="/">
            <img
              className="marca__logo"
              src={logoUrl}
              alt="Logo de Escape Libre"
            />
            <span>Escape Libre</span>
          </Link>

          <SearchBar />

          <nav className="menu" aria-label="Navegación principal">
            <NavLink className={obtenerClaseEnlace} to="/" end>
              Inicio
            </NavLink>

            <NavLink className={obtenerClaseEnlace} to="/catalogo">
              Catálogo
            </NavLink>

            <NavLink
              className={obtenerClaseEnlace}
              to="/carrito"
              aria-label={`Carrito con ${cantidadTotal} productos`}
            >
              Carrito
              <span className="menu__contador" aria-hidden="true">
                {cantidadTotal}
              </span>
            </NavLink>

            <NavLink className={obtenerClaseEnlace} to="/contacto">
              Contacto
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="contenido-principal">
        <Outlet />
      </main>

      <footer className="pie">
        <p>Escape Libre &copy; 2026. Proyecto de Taller de Desarrollo Web.</p>
        <p>Autores: Santino Mussetti y Aghassi Mingorance.</p>
      </footer>
    </div>
  )
}

export default Layout