import { useState } from 'react';
import Box from '@mui/material/Box';

function ButtonEmote({ defaultImage, hoverImage, effect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      component="img"
      alt="button"
      src={isHovered ? hoverImage : defaultImage} // Change l'image lors du survol
      height={200}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      onClick={effect} // Utilise la fonction onClick passée en props
      sx={{ border: '2px solid grey' }}
      onMouseEnter={() => setIsHovered(true)} // Définir isHovered à true lors du survol
      onMouseLeave={() => setIsHovered(false)} // Définir isHovered à false lorsqu'on quitte le survol
    />
  );
}

export default ButtonEmote;
