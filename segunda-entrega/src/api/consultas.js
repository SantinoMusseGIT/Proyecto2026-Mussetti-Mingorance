const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const crearConsulta = async (consulta) => {
  const respuesta = await fetch(`${API_URL}/consultas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consulta),
  })

  if (!respuesta.ok) {
    throw new Error('No fue posible enviar la consulta.')
  }

  return respuesta.json()
}

export { crearConsulta }