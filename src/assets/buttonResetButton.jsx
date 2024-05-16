import { ButtonProvider } from '../context/ButtonContext';

function ButtonUnlock () {
    const { resetAllButtons } = useButtonContext();
  
    const handleClick = () => {
      resetAllButtons(); // Appel de la fonction pour débloquer les boutons
    };
  
    return (
      <button onClick={handleClick}>Débloquer les boutons</button>
    );
  };
export default ButtonUnlock