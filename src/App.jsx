import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompteUtilisateur from './pages/compteUtilisateur'
import Matches from './pages/matches'
import Connexion from './pages/Connexion'
import Profil from './pages/Profil'
import NewHome from './pages/newHome'
import NotFound from './pages/NotFound'
import Scene from "./assets/scene";


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
      <div style={{height : "100vh", width : "100vw", position:"fixed", top:"0", left:"0", zIndex:"-10"}}>
        <Scene />
    </div>
    </>
  )
}

export default App
