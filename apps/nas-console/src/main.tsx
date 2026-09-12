import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@xiaoye-react/ui/style.css'
import '@xiaoye-react/pro/style.css'
import './app.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
