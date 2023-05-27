import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router.tsx'

import "./main.css"
import { AppContextProvider } from './context/AppContext.tsx'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <ToastContainer />
      <Router />
    </AppContextProvider>
  </React.StrictMode>,
)
