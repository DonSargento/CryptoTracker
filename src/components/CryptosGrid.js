
import { useContext } from 'react';
// Importamos el Context
import { CryptoContext } from '../context/CryptoContext';

import Grid from '@mui/material/Grid';

import CryptoCard from './CryptoCard';

// -----------------------

const CryptosGrid = () => {

  const { topCryptos } = useContext( CryptoContext );

  return (
    <Grid container spacing={ 3 } >
      {
        topCryptos.map( ( crypto ) => (
            <CryptoCard
              key={ crypto.CoinInfo.Id }
                crypto={ crypto }
            /> ) )
      }
    </Grid>
  )
}

export default CryptosGrid;
