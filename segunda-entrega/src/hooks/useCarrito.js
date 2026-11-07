import { useContext } from 'react'
import CarritoContext from '@/context/CarritoContext'

function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider')
  }

  return contexto
}

export default useCarrito