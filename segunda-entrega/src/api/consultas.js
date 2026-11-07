const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const guardarConsultaLocal = (consulta) => {
  let consultasGuardadas = []

  try {
    consultasGuardadas = JSON.parse(
      localStorage.getItem('consultas') ?? '[]',
    )
  } catch {
    consultasGuardadas = []
  }

  const nuevaConsulta = {
    ...consulta,
    id: Date.now().toString(),
    almacenamientoLocal: true,
  }

  localStorage.setItem(
    'consultas',
    JSON.stringify([...consultasGuardadas, nuevaConsulta]),
  )

  return nuevaConsulta
}

const crearConsulta = async (consulta) => {
  if (import.meta.env.PROD) {
    return guardarConsultaLocal(consulta)
  }

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