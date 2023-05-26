import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router.tsx'

import "./main.css"
import { AppContextProvider } from './context/AppContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </React.StrictMode>,
)
