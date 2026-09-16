import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserContextProvider from './context/UserContext'

// ✅ Redux imports
import { Provider } from 'react-redux'
import store from './redux/store'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
)