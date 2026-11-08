import baseDatos from '@/data/db.json'

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const obtenerProductos = async () => {
  if (import.meta.env.PROD) {
    return baseDatos.productos
  }

  const respuesta = await fetch(`${API_URL}/productos`)

  if (!respuesta.ok) {
    throw new Error('No fue posible obtener los productos.')
  }

  return respuesta.json()
}

export { obtenerProductos }