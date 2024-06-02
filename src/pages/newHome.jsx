// import { Navigate } from "react-router-dom";
// import {ButtonProvider} from '../context/ButtonContext';
// import ProgressButton from '../assets/buttonLocked';
// import ButtonPlay from "../assets/buttonPlay";
import Scene from "../assets/scene";

function newHome() {

  return (
    <div style={{height : "100vh", width : "100vw", position:"absolute", top:"0", left:"0"}}>
      <Scene />
      {/* <ButtonProvider>
          <ProgressButton id={1} customMessage="Pierre" />
          <ProgressButton id={2} customMessage="Papier" />
          <ProgressButton id={3} customMessage="Sciseaux" />
      </ButtonProvider>
      <ButtonPlay/> */}
    </div>
  );
}

export default newHome