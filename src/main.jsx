import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import App from './App.jsx'
import './index.css'

const theme = {
  button: {
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "magenta",
    color: "cyan",
  },

};

ReactDOM.createRoot(document.getElementById('root')).render(

        <App />

)
