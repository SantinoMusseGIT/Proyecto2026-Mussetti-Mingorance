import { useState } from 'react'
import Button from '@/components/Button'
import { crearConsulta } from '@/api/consultas'

const formularioInicial = {
  nombre: '',
  email: '',
  mensaje: '',
}

const validarCampo = (campo, valor) => {
  const texto = valor.trim()

  if (campo === 'nombre' && texto.length < 3) {
    return 'El nombre debe tener al menos 3 caracteres.'
  }

  if (
    campo === 'email' &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)
  ) {
    return 'Ingresá un correo electrónico válido.'
  }

  if (campo === 'mensaje' && texto.length < 10) {
    return 'El mensaje debe tener al menos 10 caracteres.'
  }

  return ''
}

function Contacto() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null)

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario((formularioActual) => ({
      ...formularioActual,
      [name]: value,
    }))

    setErrores((erroresActuales) => ({
      ...erroresActuales,
      [name]: validarCampo(name, value),
    }))

    setResultado(null)
  }

  const manejarEnvio = async (evento) => {
    evento.preventDefault()

    const nuevosErrores = Object.fromEntries(
      Object.entries(formulario).map(([campo, valor]) => [
        campo,
        validarCampo(campo, valor),
      ]),
    )

    setErrores(nuevosErrores)

    if (Object.values(nuevosErrores).some(Boolean)) {
      setResultado({
        tipo: 'error',
        mensaje: 'Revisá los campos marcados antes de enviar.',
      })
      return
    }

    try {
      setEnviando(true)
      setResultado(null)

      await crearConsulta({
        ...formulario,
        fecha: new Date().toISOString(),
      })

      setFormulario(formularioInicial)
      setErrores({})
      setResultado({
        tipo: 'exito',
        mensaje: 'Tu consulta fue enviada correctamente.',
      })
    } catch (error) {
      setResultado({
        tipo: 'error',
        mensaje: error.message,
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="pagina contacto">
      <div className="contacto__encabezado">
        <p className="contacto__subtitulo">Estamos para ayudarte</p>
        <h1>Contacto</h1>
        <p>
          Dejanos tu consulta y te responderemos a la brevedad.
        </p>
      </div>

      <form
        className="formulario-contacto"
        noValidate
        onSubmit={manejarEnvio}
      >
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={formulario.nombre}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? 'error-nombre' : undefined}
            onChange={manejarCambio}
          />

          {errores.nombre && (
            <p className="campo-formulario__error" id="error-nombre">
              {errores.nombre}
            </p>
          )}
        </div>

        <div className="campo-formulario">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formulario.email}
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? 'error-email' : undefined}
            onChange={manejarCambio}
          />

          {errores.email && (
            <p className="campo-formulario__error" id="error-email">
              {errores.email}
            </p>
          )}
        </div>

        <div className="campo-formulario">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="6"
            value={formulario.mensaje}
            aria-invalid={Boolean(errores.mensaje)}
            aria-describedby={
              errores.mensaje ? 'error-mensaje' : undefined
            }
            onChange={manejarCambio}
          />

          {errores.mensaje && (
            <p className="campo-formulario__error" id="error-mensaje">
              {errores.mensaje}
            </p>
          )}
        </div>

        {resultado && (
          <p
            className={`formulario-contacto__resultado formulario-contacto__resultado--${resultado.tipo}`}
            role={resultado.tipo === 'error' ? 'alert' : 'status'}
          >
            {resultado.mensaje}
          </p>
        )}

        <Button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar consulta'}
        </Button>
      </form>
    </section>
  )
}

export default Contacto