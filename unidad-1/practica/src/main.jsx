import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApiDataProvider } from './contexts/ApiDataContext.jsx'
import { PreferencesProvider } from './contexts/PreferencesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreferencesProvider>
      <ApiDataProvider>
        <App />
      </ApiDataProvider>
    </PreferencesProvider>
  </React.StrictMode>,
)
