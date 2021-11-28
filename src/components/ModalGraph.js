
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

import { Modal, Box } from '@mui/material';
import CanvasGraph from './CanvasGraph';

const boxStyle = {
  position : 'absolute',
  top : '50%',
  left : '50%',
  transform : 'translate( -50%, -50% )',
  // maxheight : '90%',
  width : '100%',
  maxWidth : 1300,
  // height: 800,
  pointerEvents : 'none',
  // overflowY : 'auto'
  // bgcolor : '#161616',
  // boxShadow : 24,
}


const ModalGraph = () => {

  const {
    modalOpen,
    setModalOpen,
    currency,
    datosCrypto
  } = useContext( CryptoContext );
  
  return (
    <Modal
      open={ modalOpen }
      onClose={ () => {
        setModalOpen( false );
       } }
      style={ { backgroundColor: 'rgba( 0, 0, 0, 0.8 )' } }
    >
      <Box
        sx={ boxStyle }
        style={ { padding : 0 } }
      >
        <h1
          style={ {
            color : '#fff',
            fontSize : '2.6rem',
            marginTop : 0,
            paddingLeft : '60px'
          } }
        >{
          datosCrypto.fullname
        }<span
          style={
            {
              color: '#888',
              // marginLeft : '0.5em',
              fontWeight : 300
            }
          }
        > - {
          datosCrypto.name
        }</span>
        </h1>
        <CanvasGraph />
        {
          datosCrypto.min !== false && <p
            style={
              {
                color : '#fff',
                padding : '0 60px',
                margin : 0,
                marginTop : '1rem',
                fontWeight : 300,
                fontSize : '1.2rem',
                textAlign : 'right'
              }
            }>
              <span
                style={
                  {
                    
                  }
                }
              >MIN : { datosCrypto.min.toLocaleString( 'en-US' ) } { currency }</span>
              <span
                style={
                  {
                    display : 'inline-block',
                    marginLeft : '1em',
                    whiteSpace : 'nowrap'
                  }
                }
              >MAX : { datosCrypto.max.toLocaleString( 'en-US' ) } { currency }</span>
              <span
                style={
                  { 
                    color : 'rgb( 188, 28, 255 )',
                    fontWeight : 400,
                    marginLeft : '1em',
                    whiteSpace : 'nowrap'
                  }
                }
              >NOW : { datosCrypto.now.toLocaleString( 'en-US' ) } { currency }</span>
            </p>
        }
      </Box>
    </Modal>
  )
}

export default ModalGraph;

