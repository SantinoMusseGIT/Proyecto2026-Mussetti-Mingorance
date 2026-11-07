const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const obtenerProductos = async () => {
  const url = import.meta.env.PROD
    ? `${import.meta.env.BASE_URL}db.json`
    : `${API_URL}/productos`

  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error('No fue posible obtener los productos.')
  }

  const datos = await respuesta.json()

  return import.meta.env.PROD ? datos.productos : datos
}

export { obtenerProductos }