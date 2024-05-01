import React, { useState, useRef } from 'react';

const ProgressButton = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  const handleMouseDown = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 1 : 100));
    }, 20);
  };

  const handleMouseUp = () => {
    if (progress < 100) {
      clearInterval(intervalRef.current);
      setProgress(0);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ width: '200px', height: '50px' }}
      disabled={progress === 100}
    >
      {progress}%
    </button>
  );
};

export default ProgressButton;
