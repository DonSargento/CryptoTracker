
import { useState, useEffect, createContext, useCallback } from 'react';

// Cargamos el listado de monedas que aparecerán en el <select>
import { currencies } from "../data/currencies.js";

export const CryptoContext = createContext();

const CryptoProvider = ( props ) => {

  // State con la moneda en la que aparecerán los precios
  const [ currency, setCurrency ] = useState( currencies[0].curr );
  // State con la información de las criptoMonedas en la moneda seleccionada
  const [ topCryptos, setTopCryptos ] = useState([]);
  // State de cuando se están cargando los datos
  const [ loadingCryptos, setLoadingCryptos ] = useState( true );
  // Creamos un State para saber si hay que cargar los datos de la gráfica
  const [ updateGraphData, setUpdateGraphData ] = useState( true );
  // State del estado de la ventana Modal
  const [ modalOpen, setModalOpen ] = useState( false );
  // Creamos un State con los datos de la gráfica
  const [ graphData, setGraphData ] = useState( {} );
  // State de los valores Mínimo, Máximo y Actual de la Crypto Seleccionada
  const [ datosCrypto, setDatosCrypto ] = useState( {
    name : '',
    fullname : '',
    min : false,
    max : false,
    now : false
  } );

  // Cargamos las Cryptomonedas ( al inicio y cuando cambia de 'currency' )
  useEffect( () => {
    const loadCrypto = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=12&tsym=${ currency }`;
      const response = await fetch( url );
      const datos = await response.json();
      setTopCryptos( datos.Data );
      setLoadingCryptos( false );
    }
    loadCrypto();
  }, [ currency ] );

  // Evaluamos si se ha modificado el ancho de la ventana, en tal caso se cierra el modal
  const handleResizeModal = useCallback( () => {
    if( modalOpen ){ setModalOpen( false ); }
  }, [ modalOpen ] );
  
  useEffect( () => {
    window.addEventListener( 'resize', handleResizeModal );
    return () => {
      window.removeEventListener( 'resize', handleResizeModal );
    }
  }, [ handleResizeModal ] );

  // useEffect( () => {
  //   if( currency.trim() !== '' && datosCrypto.name.trim() !== '' ){
  //     setUpdateGraphData( true );
  //   }
  // }, [ currency, datosCrypto ] );

  // -----------------------------

  return (
    <CryptoContext.Provider
      value={
        {
          currencies,
          currency, setCurrency,
          topCryptos, setTopCryptos,
          loadingCryptos, setLoadingCryptos,
          modalOpen, setModalOpen,
          updateGraphData, setUpdateGraphData,
          graphData, setGraphData,
          datosCrypto, setDatosCrypto
        }
      }
    >
      { props.children }
    </CryptoContext.Provider>
  )

}

export default CryptoProvider;