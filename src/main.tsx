import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import QueryProvider from './lib/react-query/QueryProvider.tsx'
import ContextProvider from './context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ContextProvider>
    <App />
    </ContextProvider>
    </QueryProvider>
  </React.StrictMode>,
)
