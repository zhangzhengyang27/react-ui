import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@react-ui/ui'
import App from './App'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
            <App />
        </Provider>
    </React.StrictMode>
)
