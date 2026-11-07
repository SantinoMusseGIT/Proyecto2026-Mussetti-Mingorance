import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import CarritoProvider from '@/context/CarritoProvider'
import router from '@/router'
import '@/styles/main.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <RouterProvider router={router} />
    </CarritoProvider>
  </StrictMode>,
)