import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CarritoContext from "@/context/CarritoContext";

const obtenerCarritoGuardado = () => {
  try {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch {
    return [];
  }
};

function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(obtenerCarritoGuardado);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id,
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...carritoActual, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    const numeroIngresado = Number(nuevaCantidad);

    const cantidadValida =
      Number.isInteger(numeroIngresado) && numeroIngresado >= 1
        ? Math.min(numeroIngresado, 99)
        : 1;

    setCarrito((carritoActual) =>
      carritoActual.map((item) =>
        item.id === id ? { ...item, cantidad: cantidadValida } : item,
      ),
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id),
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

  const valorContexto = {
    carrito,
    cantidadTotal,
    agregarProducto,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
  };

  return (
    <CarritoContext.Provider value={valorContexto}>
      {children}
    </CarritoContext.Provider>
  );
}

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CarritoProvider;
