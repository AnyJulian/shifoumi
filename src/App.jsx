import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CompteUtilisateur from './pages/compteUtilisateur'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/compteutilisateur' element={<CompteUtilisateur />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
