import { Navigate } from "react-router-dom";
import {ButtonProvider} from '../context/ButtonContext';
import ProgressButton from '../assets/buttonLocked';
import ButtonPlay from "../assets/buttonPlay";


function newHome() {

  return (
    <>
      <h1>New Home</h1>
      <ButtonProvider>
          <ProgressButton id={1} customMessage="Pierre" />
          <ProgressButton id={2} customMessage="Papier" />
          <ProgressButton id={3} customMessage="Sciseaux" />
      </ButtonProvider>
      <ButtonPlay/>
    </>
  );
}

export default newHome