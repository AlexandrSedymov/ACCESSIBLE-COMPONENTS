import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'

// Initialize axe-core in development mode
if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    // Initialize with 1000ms delay to allow components to mount
    axe.default(React, ReactDOM, 1000)
  }).catch((error) => {
    console.warn('Failed to load @axe-core/react:', error)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
