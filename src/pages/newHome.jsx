import { Navigate } from "react-router-dom";
import ProgressButton from "../assets/buttonLocked";
import ButtonPlay from "../assets/buttonPlay";

function newHome() {

  return (
    <>
    <h1>New Home</h1>
    <ProgressButton/>
    <ButtonPlay title="Jouer" chemin="/connexion"/>
  </>
  );
}

export default newHome