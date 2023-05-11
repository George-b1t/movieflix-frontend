import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './Router.tsx'


import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";

import 'primeicons/primeicons.css';
                                          
        

import "./main.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
