// ProgressButton.js
import React, { useState, useRef } from 'react';
import { useButtonContext } from '../context/ButtonContext';

const ProgressButton = ({ id, customMessage }) => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef();
  const { activeButtonId, disableAllButtonsExcept } = useButtonContext();

  const handleMouseDown = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
    }, 20);
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
    if (progress === 100) {
      setIsActive(false);
      disableAllButtonsExcept(id); // Désactiver tous les autres boutons sauf celui-ci
    } else {
      setProgress(0);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ width: '200px', height: '50px' }}
      disabled={!isActive || (activeButtonId && activeButtonId !== id)}
    >
      {progress === 100 ? customMessage : `${progress}%`}
    </button>
  );
};

export default ProgressButton;
