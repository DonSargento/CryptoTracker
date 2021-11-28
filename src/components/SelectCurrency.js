
import { useContext } from 'react';
// Importamos el Context
import { CryptoContext } from '../context/CryptoContext';

import { Select, MenuItem, Grid } from '@mui/material';


const SelectCurrency = () => {

  // Importamos las props del Context
  const { currencies, currency, setCurrency, setLoadingCryptos, setUpdateGraphData, setDatosCrypto } = useContext( CryptoContext );

  const handleSelectCurrency = e => {
    setLoadingCryptos( true );
    setCurrency( e.target.value );
    setUpdateGraphData( true );
    // Resteamos los datos de la Crypto seleccionada
    setDatosCrypto( {
      name : '',
      fullname : '',
      min : false,
      max : false,
      now : false
    } );
  };

  return (
    <Grid container spacing={ 3 } justifyContent="end" sx={ { mb : 4, mt : 4 } }>
      <Grid item xs={12} md={6} lg={6} sx={ { textAlign : 'start' } } >
      <h1 style={ {
          fontSize : '4.4rem',
          color : '#161616',
          letterSpacing : '-.06em',
          fontWeight : 700,
          marginTop: '-0.15em',
          marginBottom : 0,
          position : 'relative',
          bottom : '0.1em',
          textShadow : '1px -1px 1.5px rgba( 0, 0, 0, 0.3 ), -1px 1px 1.5px rgba( 255, 255, 255, 0.4 )',
        } }>CryptoTracker</h1>
      </Grid>
      <Grid item xs={6} sm={6} md={2} lg={3} sx={ { textAlign : 'end' } } >
        <p className="texto-select-currency">Prices in</p>
      </Grid>
      <Grid item xs={6} sm={6} md={4} lg={3} id="currency-select-grid-item" >
        <Select
          value={ currency }
          onChange={ handleSelectCurrency }
          sx={ { width : '100%', textAlign : 'left' } }
        >
          {
            currencies.map( c => (
              <MenuItem key={ c.curr } value={ c.curr }>{ c.name }</MenuItem>
            ) )
          }
        </Select>
      </Grid>
    </Grid>
  )
}

export default SelectCurrency
