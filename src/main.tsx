import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import config from './config/photographer'
import './index.css'

// Apply the configurable brand palette.
const cssVar = (k: string) => `--brand-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`
for (const [key, value] of Object.entries(config.colors)) document.documentElement.style.setProperty(cssVar(key), value)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
