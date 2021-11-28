
import { useEffect, useState } from "react";

const useWindowSize = () => {
  
  // Definimos el State
  const [ windowSize, setWindowSize ] = useState( {
    ancho : null,
    alto : null
  } );

  // Ejecutamos la función al inicio
  useEffect( () => {

    const handleResize = () => {
      setWindowSize( {
        ancho : window.innerWidth,
        alto : window.innerHeight
      } );
    }
    // Ejecutamos la función por vez primera
    handleResize();
    
    window.addEventListener( 'resize', handleResize );
    
    // Nos aseguramos de eliminar el Listener cuando desmontamos el Hook
    return () => {
      window.removeEventListener( 'resize', handleResize );
    }

  }, [] )

  return windowSize;

}
 
export default useWindowSize;
