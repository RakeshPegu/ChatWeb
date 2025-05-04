import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/context.tsx'
import { SocketContextProvider } from './context/socketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
      <App />
      </SocketContextProvider>      
    </AuthContextProvider>      
  </React.StrictMode>
    
  
)
  