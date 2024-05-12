// ButtonContext.js
import React, { createContext, useContext, useState } from 'react';

// Création d'un contexte pour gérer l'état des boutons
const ButtonContext = createContext();

// Hook personnalisé pour utiliser le contexte des boutons
export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('useButtonContext doit être utilisé à l\'intérieur de ButtonProvider');
  }
  return context;
};

// Provider de contexte des boutons pour encapsuler les boutons
export const ButtonProvider = ({ children }) => {
  const [activeButtonId, setActiveButtonId] = useState(null);

  const disableAllButtonsExcept = (buttonId) => {
    setActiveButtonId(buttonId);
  };

  const contextValue = {
    activeButtonId,
    disableAllButtonsExcept,
  };

  return (
    <ButtonContext.Provider value={contextValue}>
      {children}
    </ButtonContext.Provider>
  );
};

export default ButtonContext