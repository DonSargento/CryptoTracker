
import CryptoProvider from "./context/CryptoContext";

import { Container } from '@mui/material';

// import useWindowSize from "./hooks/useWindowSize";

import SelectCurrency from "./components/SelectCurrency";
import CryptosGrid from "./components/CryptosGrid";
import ModalGraph from "./components/ModalGraph";


function App() {

  // // State con la moneda en la que aparecerán los precios
  // const [ currency, setCurrency ] = useState( currencies[0].curr );
  // // State con la información de las criptoMonedas en la moneda seleccionada
  // const [ topCryptos, setTopCryptos ] = useState([]);
  // // State de cuando se están cargando los datos
  // const [ loadingCryptos, setLoadingCryptos ] = useState( false );
  // // State del estado de la ventana Modal
  // const [ modalOpen, setModalOpen ] = useState( false );
  // // State de la Crypto seleccionada ( para la gráfica )
  // const [ crypto, setCrypto ] = useState('');

  // // const { ancho, alto } = useWindowSize();



  // // Cargamos las Cryptomonedas
  // useEffect( () => {

  //   const loadCrypto = async () => {

  //     const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=12&tsym=${ currency }`;

  //     const response = await fetch( url );
  //     const datos = await response.json();

  //     setTopCryptos( datos.Data );

  //     setLoadingCryptos( false );
      
  //     // console.log( url );

  //   }
  //   loadCrypto();

  // }, [ currency ] );

  // Datos de los últimos 30 días ( + el actual )
  // https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30

  return (
    <CryptoProvider>
      <Container sx={ { pb : 10 } } >
        <SelectCurrency />
        <CryptosGrid />
      </Container>
      <ModalGraph />
    </CryptoProvider>
  );

}

export default App;
