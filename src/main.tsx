import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'

function Boot() {
  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {})
  }, [])
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Boot />
  </React.StrictMode>,
)
