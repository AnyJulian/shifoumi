import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CompteUtilisateur from './pages/compteUtilisateur'
import Matches from './pages/matches'
import Connexion from './pages/Connexion'
import Profil from './pages/Profil'
import NewHome from './pages/newHome'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/compteutilisateur' element={<CompteUtilisateur />}/>
          <Route path='/connexion' element={<Connexion />}/>
          <Route path='/profil' element={<Profil />}/>
          <Route path='/Matches' element={<Matches />}/>
          <Route path='/Home' element={<NewHome />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
