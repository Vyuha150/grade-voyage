import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppProviders from './providers/AppProviders'
import './index.css'

// Debug React version to ensure single instance
console.log('React version:', React.version)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)