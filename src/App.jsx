import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CompteUtilisateur from './pages/compteUtilisateur'
import Matches from './pages/matches'
import Connexion from './pages/Connexion'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/compteutilisateur' element={<CompteUtilisateur />}/>
          <Route path='/connexion' element={<Connexion />}/>
          <Route path='/Matches' element={<Matches />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
