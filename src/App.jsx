import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompteUtilisateur from './pages/compteUtilisateur'
import Matches from './pages/matches'
import Connexion from './pages/Connexion'
import Profil from './pages/Profil'
import NewHome from './pages/newHome'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Connexion />}/>
            <Route path='/compteutilisateur' element={<CompteUtilisateur />}/>
            <Route path='/connexion' element={<Connexion />}/>
            <Route path='/profil' element={<Profil />}/>
            <Route path='/Matches' element={<Matches />}/>
            <Route path='/Home' element={<NewHome />}/>
            <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
