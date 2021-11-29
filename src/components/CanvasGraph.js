
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import { useRef, useEffect, useContext } from 'react';

import { CryptoContext } from '../context/CryptoContext';

import { drawGraph } from '../helpers/GraphCrypto'

const CanvasGraph = () => {

  const {
    currency,  // moneda en la que se está visualizando la aplicación
    modalOpen, // bool que nos avisa si está abierta la ventana modal
    updateGraphData,  // bool que nos avisa si es necesario actualizar los datos de la gráfica
    setUpdateGraphData,  // función para actualizar la variable anterior
    graphData,  // Datos a graficar
    setGraphData,  // función para actualizar los datos a graficar
    datosCrypto,
    setDatosCrypto
  } = useContext( CryptoContext );


  const canvasRef = useRef();

  // Cargamos los datos cuando sea necesario
  useEffect( () => {

    const ctx = canvasRef.current.getContext( '2d' );
    
    if( modalOpen ){
      if( updateGraphData ){
        const loadGraphData = async () => {
          const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${ datosCrypto.name }&tsym=${ currency }&limit=30&api_key=33a4d62b48b549dd31c1dc361aacfaf43063d98c6c0642b235b2ac8cf7bfbbe1`;
          const response = await fetch( url );
          const datos = await response.json();
          setGraphData( datos.Data );
          setUpdateGraphData( false ); // boolean para actualiza los datos de la gráfica
        }
        loadGraphData(); // Ejecuta la función de carga
      } else {
        drawGraph( ctx, graphData, datosCrypto, setDatosCrypto, currency );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ modalOpen, updateGraphData ] );
  

  return (
    <div style={ { } }>
      <canvas
        ref={ canvasRef }
        height='480'
        style={ { pointerEvents : 'auto', display : 'block' } }
      />
    </div>
  )
}

export default CanvasGraph;
