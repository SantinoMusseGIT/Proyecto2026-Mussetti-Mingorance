import { createHashRouter } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Carrito from '@/pages/Carrito'
import Catalogo from '@/pages/Catalogo'
import Contacto from '@/pages/Contacto'
import Inicio from '@/pages/Inicio'
import NoEncontrada from '@/pages/NoEncontrada'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: 'catalogo',
        element: <Catalogo />,
      },
      {
        path: 'carrito',
        element: <Carrito />,
      },
      {
        path: 'contacto',
        element: <Contacto />,
      },
      {
        path: '*',
        element: <NoEncontrada />,
      },
    ],
  },
])

export default router