import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import compteUtilisateur from './pages/compteUtilisateur'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/compteutilisateur' element={<compteUtilisateur />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
