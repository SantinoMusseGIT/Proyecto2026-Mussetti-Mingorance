import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import useCarrito from "@/hooks/useCarrito";

const formateadorPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

function Carrito() {
  const navigate = useNavigate();
  const [codigoPostal, setCodigoPostal] = useState("");
  const [envio, setEnvio] = useState(null);

  const {
    carrito,
    cantidadTotal,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  } = useCarrito();

  const subtotal = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0,
  );

  const total = subtotal + (envio ?? 0);

  const manejarCambioCantidad = (evento, productoId) => {
    const numeroIngresado = Number(evento.target.value);

    const cantidadValida =
      Number.isInteger(numeroIngresado) && numeroIngresado >= 1
        ? Math.min(numeroIngresado, 99)
        : 1;

    evento.target.value = String(cantidadValida);
    cambiarCantidad(productoId, cantidadValida);
  };

  const calcularEnvio = () => {
    const codigoValido =
      /^\d{4}$/.test(codigoPostal) && Number(codigoPostal) >= 1000;

    if (!codigoValido) {
      window.alert("Ingresá un código postal válido de 4 números.");
      setCodigoPostal("");
      setEnvio(null);
      return;
    }

    if (codigoPostal.startsWith("5")) {
      setEnvio(8000);
    } else {
      setEnvio(15000);
    }
  };

  const finalizarCompra = () => {
    const cantidadesInvalidas = carrito.some((producto) => {
      const cantidad = Number(producto.cantidad);

      return !Number.isInteger(cantidad) || cantidad < 1;
    });

    if (cantidadesInvalidas) {
      window.alert("Todos los productos deben tener una cantidad mínima de 1.");
      return;
    }

    if (envio === null) {
      window.alert("Calculá el envío antes de finalizar la compra.");
      return;
    }

    window.alert(
      `¡Gracias por tu compra! Total a pagar: ${formateadorPrecio.format(total)}`,
    );
  };

  const confirmarEliminacion = (producto) => {
    const confirmar = window.confirm(
      `¿Querés quitar ${producto.nombre} del carrito?`,
    );

    if (confirmar) {
      eliminarProducto(producto.id);
    }
  };

  const confirmarVaciado = () => {
    const confirmar = window.confirm("¿Querés vaciar todo el carrito?");

    if (confirmar) {
      vaciarCarrito();
      setEnvio(null);
      setCodigoPostal("");
    }
  };

  if (carrito.length === 0) {
    return (
      <section className="pagina carrito-vacio">
        <nav className="migas" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link> &gt; <span>Carrito</span>
        </nav>

        <h1>Mi carrito (0 productos)</h1>

        <p>
          Tu carrito está vacío.{" "}
          <Link className="carrito-vacio__enlace" to="/catalogo">
            Ver el catálogo
          </Link>
        </p>
      </section>
    );
  }

  const palabraProducto = cantidadTotal === 1 ? "producto" : "productos";

  return (
    <section className="pagina carrito">
      <nav className="migas" aria-label="Ruta de navegación">
        <Link to="/">Inicio</Link> &gt; <span>Carrito</span>
      </nav>

      <h1>
        Mi carrito ({cantidadTotal} {palabraProducto})
      </h1>

      <div className="carrito__columnas">
        <div className="carrito__productos">
          {carrito.map((producto) => {
            const imagenUrl = `${import.meta.env.BASE_URL}productos/${producto.imagen}`;

            return (
              <article className="item-carrito" key={producto.id}>
                <img
                  className="item-carrito__imagen"
                  src={imagenUrl}
                  alt={producto.nombre}
                />

                <div className="item-carrito__informacion">
                  <h2>{producto.nombre}</h2>

                  <p className="item-carrito__precio">
                    {formateadorPrecio.format(producto.precio)}
                  </p>
                </div>

                <div className="item-carrito__cantidad">
                  <Button
                    variant="secondary"
                    className="item-carrito__control"
                    aria-label={`Restar una unidad de ${producto.nombre}`}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad - 1)
                    }
                  >
                    −
                  </Button>

                  <label
                    className="solo-lectores"
                    htmlFor={`cantidad-${producto.id}`}
                  >
                    Cantidad de {producto.nombre}
                  </label>

                  <input
                    id={`cantidad-${producto.id}`}
                    type="number"
                    min="1"
                    max="99"
                    step="1"
                    value={producto.cantidad}
                    onChange={(evento) =>
                      manejarCambioCantidad(evento, producto.id)
                    }
                  />

                  <Button
                    variant="secondary"
                    className="item-carrito__control"
                    aria-label={`Sumar una unidad de ${producto.nombre}`}
                    onClick={() =>
                      cambiarCantidad(producto.id, producto.cantidad + 1)
                    }
                  >
                    +
                  </Button>
                </div>

                <button
                  type="button"
                  className="item-carrito__eliminar"
                  onClick={() => confirmarEliminacion(producto)}
                >
                  Eliminar
                </button>
              </article>
            );
          })}
        </div>

        <aside className="resumen-carrito" aria-label="Resumen de compra">
          <h2>Resumen de compra</h2>

          <div className="resumen-carrito__fila">
            <span>Subtotal</span>
            <strong>{formateadorPrecio.format(subtotal)}</strong>
          </div>

          <div className="resumen-carrito__fila">
            <span>Envío</span>

            <strong>
              {envio === null ? "A calcular" : formateadorPrecio.format(envio)}
            </strong>
          </div>

          <div className="resumen-carrito__envio">
            <label htmlFor="codigo-postal">Código postal</label>

            <div>
              <input
                id="codigo-postal"
                type="text"
                inputMode="numeric"
                maxLength="4"
                value={codigoPostal}
                placeholder="Ej: 5000"
                onChange={(evento) =>
                  setCodigoPostal(
                    evento.target.value.replace(/\D/g, "").slice(0, 4),
                  )
                }
              />

              <Button variant="secondary" type="button" onClick={calcularEnvio}>
                Calcular envío
              </Button>
            </div>
          </div>

          <div className="resumen-carrito__fila resumen-carrito__total">
            <span>Total</span>
            <strong>{formateadorPrecio.format(total)}</strong>
          </div>

          <Button
            className="resumen-carrito__finalizar"
            type="button"
            onClick={finalizarCompra}
          >
            Finalizar compra
          </Button>

          <Button
            variant="secondary"
            className="resumen-carrito__vaciar"
            type="button"
            onClick={confirmarVaciado}
          >
            Vaciar carrito
          </Button>

          <button
            type="button"
            className="resumen-carrito__seguir"
            onClick={() => navigate("/catalogo")}
          >
            ← Seguir comprando
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Carrito;
