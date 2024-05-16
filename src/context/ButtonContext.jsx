// Dans ButtonContext.js

import React, { createContext, useContext, useState } from 'react';

const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [activeButtonId, setActiveButtonId] = useState(null);
  const [blocked, setBlocked] = useState(false); // Ajout de l'état pour gérer le blocage des boutons

  const disableAllButtonsExcept = (id) => {
    setActiveButtonId(id);
  };

  const enableAllButtons = () => {
    setActiveButtonId(null);
  };

  return (
    <ButtonContext.Provider value={{ activeButtonId, disableAllButtonsExcept, blocked, setBlocked, enableAllButtons }}>
      {children}
    </ButtonContext.Provider>
  );
};

export const useButtonContext = () => useContext(ButtonContext);
