import {NextUIProvider} from "@nextui-org/react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import './index.css'
import './WebVitals.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NextUIProvider>
)
