
import { useContext } from 'react';
// importamos el Context
import { CryptoContext } from '../context/CryptoContext';

import { Grid, Paper, Fab } from '@mui/material';
import { ArrowUpward, ArrowDownward, Timeline } from '@mui/icons-material';

// ----------------------

const CryptoCard = ( { crypto } ) => {

  
  const {
    loadingCryptos,
    currency,
    setModalOpen,
    datosCrypto,
    setDatosCrypto,
    setUpdateGraphData
  } = useContext( CryptoContext );

  return (
    <Grid item xxs={ 2 } xs={12} sm={6} md={4} lg={3}>
      <Paper className="crypto-card" elevation={8} sx={ { borderRadius : 2, px : 3, py : 1 } } >
        <img
          src={ `https://www.cryptocompare.com/${ crypto.CoinInfo.ImageUrl }` }
          alt={ crypto.CoinInfo.FullName }
          className="crypto-image"
        />
        <h2>{ crypto.CoinInfo.FullName }</h2>
        <h3>{ crypto.CoinInfo.Name }</h3>
        {
          loadingCryptos || !crypto.RAW
            ? <><p className="crypto-precio">---</p><p>---</p></>
            : <>
                <p className="crypto-precio"><span>Price</span>{
                  ` ${ crypto.RAW[currency].PRICE.toLocaleString( 'en-US', { maximumFractionDigits: 5 } ) } `
                }<span>{ currency }</span></p>
                <p
                  className={
                    parseFloat( crypto.RAW[currency].CHANGEPCT24HOUR, 10 ) < 0
                      ? 'crypto-down'
                      : (
                        parseFloat( crypto.RAW[currency].CHANGEPCT24HOUR, 10 ) > 0
                          ? 'crypto-up'
                          : ''
                        )
                  }
                >
                  <span>Last 24h</span>
                  { ` ${ parseFloat( crypto.RAW[currency].CHANGEPCT24HOUR, 10 ).toFixed( 2 ) }%` }
                  {
                    parseFloat( crypto.RAW[currency].CHANGEPCT24HOUR, 10 ) < 0
                      ? <ArrowDownward style={{ position: 'relative', top : '0.15rem' } } />
                      : (
                        parseFloat( crypto.RAW[currency].CHANGEPCT24HOUR, 10 ) > 0
                          ? <ArrowUpward style={{ position: 'relative', top : '0.15rem' } } />
                          : ''
                        )
                  }
                </p>
                <div id="crypto-graph-btn">
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="show graph"
                    onClick={ () => {
                        // Abrimos la ventana modal
                        setModalOpen( true );
                        if( datosCrypto.name !== crypto.CoinInfo.Name ){
                          // Actualizamos los datos de la Crypto que se está visualizando
                          setDatosCrypto( {
                            ...datosCrypto,
                            name : crypto.CoinInfo.Name,
                            fullname : crypto.CoinInfo.FullName,
                            now : crypto.RAW[ currency ].PRICE // .toLocaleString( 'en-US' ), { maximumFractionDigits: 5 } )
                          } );
                          setUpdateGraphData( true );
                        } else {
                          setUpdateGraphData( false );
                        }
                      }
                    }
                    >
                    <Timeline />
                  </Fab>
                </div>
              </>
        }
      </Paper>
    </Grid>
  )
}

export default CryptoCard
