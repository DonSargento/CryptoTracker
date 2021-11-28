
const arrMeses = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ];

export const drawGraph = ( ctx, graphData, datosCrypto, setDatosCrypto, currency ) => {

  // Ajustamos el ancho del canvas ( del mismo ancho que su contenedor )
  ctx.canvas.width = ctx.canvas.parentNode.offsetWidth;
  
  const margenW = 60;
  const margenH = 60;

  const ancho = ctx.canvas.width - margenW * 2;
  const alto = ctx.canvas.height - margenH * 2;

  // Creamos los Arrays con la información desde los datos obtenidos
  // Valores mínimos
  const arrMin = graphData.Data.map( val => val.low );
  // Valores máximos
  const arrMax = graphData.Data.map( val => val.high );
  // Fechas
  const arrFechas = graphData.Data.map( fecha => new Date( fecha.time * 1000 ) );

  // Obtenemos los generales de la gráfica
  const incremento = ancho / ( arrMin.length - 1 );
  const minVal = Math.min( ...arrMin );
  const maxVal = Math.max( ...arrMax );
  const rango = maxVal - minVal;

  // Escribimos la información de la Crypto en el State
  setDatosCrypto( {
    ...datosCrypto,
    min : minVal,
    max : maxVal
  } );

  // Rellenamos con un gradiente
  const grad = ctx.createLinearGradient( 0, 0, 0, alto );
        grad.addColorStop( 1, '#333' );
        grad.addColorStop( 0, '#111' );
  ctx.fillStyle = grad;
  ctx.fillRect( margenW, margenH, ancho, alto );

  // Dibujamos las líneas de las fechas
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#444';
  ctx.beginPath();
  arrFechas.forEach( ( e, i ) => {
    ctx.moveTo( Math.round( incremento * i ) + margenW + 0.5, margenH - 6 );
    ctx.lineTo( Math.round( incremento * i ) + margenW + 0.5, margenH + alto + 6 );
  } );
  ctx.stroke();
  // Escribimos las fechas
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#666';
  ctx.save();
  ctx.rotate( -Math.PI / 2 );
  arrFechas.forEach( ( e, i ) => {

    if( ctx.canvas.width <= 800 && ( i % 2 ) ){ return; }

    ctx.textAlign = 'right';
    ctx.fillText( `${ arrMeses[ e.getMonth() ] }  ${ e.getDate() }`,
                  - alto - margenH - 14.5,
                  Math.round( 4 + ( margenH + incremento * i ) ) );
    ctx.textAlign = 'left';
    ctx.fillText( `${ arrMeses[ e.getMonth() ] }  ${ e.getDate() }`,
                  - margenH + 14.5,
                  Math.round( 4 + ( margenH + incremento * i ) ) );
  } );
  ctx.restore();


  // Margen y altura de la gráfica ( dentro del área definida por 'ancho' y 'alto' )
  const margenG = 0.1 * alto;
  const alturaG = alto - ( margenG * 2 );
  const escalaG = alturaG / rango;

  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // Dibujamos los valores máximos
  ctx.strokeStyle = 'rgb( 200, 200, 200 )';
  ctx.fillStyle = 'rgba( 200, 200, 200, 0.15 )';
  ctx.beginPath();
  arrMax.forEach( ( p, i ) => {
    !i
      ? ctx.moveTo( margenW + ( incremento * i ), margenH + alto - margenG - ( ( p - minVal ) * escalaG ) )
      : ctx.lineTo( margenW + ( incremento * i ), margenH + alto - margenG - ( ( p - minVal ) * escalaG ) )
  } );
  ctx.stroke();
  ctx.lineTo( margenW + ancho, margenH + alto );
  ctx.lineTo( margenW, margenH + alto );
  ctx.fill();

  // Dibujamos los valores mínimos
  ctx.strokeStyle = 'rgb( 200, 200, 200 )';
  ctx.fillStyle = 'rgba( 200, 200, 200, 0.15 )';
  ctx.beginPath();
  arrMin.forEach( ( p, i ) => {
    !i
      ? ctx.moveTo( margenW + ( incremento * i ), margenH + alto - margenG - ( ( p - minVal ) * escalaG ) )
      : ctx.lineTo( margenW + ( incremento * i ), margenH + alto - margenG - ( ( p - minVal ) * escalaG ) )
  } );
  ctx.stroke();
  ctx.lineTo( margenW + ancho, margenH + alto );
  ctx.lineTo( margenW, margenH + alto );
  ctx.fill();

  // Dibujamos las líneas del máximo y mínimo
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  for( let i = margenW - 5; i <= margenW + ancho + 5; i += 6 ){
    // Línea del máximo
    ctx.moveTo( i, Math.round( margenH + margenG ) - 0.5 );
    ctx.lineTo( i + 2, Math.round( margenH + margenG ) - 0.5 );
    // Línea del mínimo
    ctx.moveTo( i, Math.round( margenH + alto - margenG ) + 0.5 );
    ctx.lineTo( i + 2, Math.round( margenH + alto - margenG ) + 0.5 );
  }
  ctx.stroke();

  // Dibujamos la línea del valor actual
  ctx.strokeStyle = 'rgb( 188, 28, 255 )';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo( margenW - 5, Math.round( margenH + alto - margenG - ( ( datosCrypto.now - minVal ) * escalaG ) ) );
  ctx.lineTo( margenW + 5 + ancho, Math.round( margenH + alto - margenG - ( ( datosCrypto.now - minVal ) * escalaG ) ) );
  ctx.stroke();

  ctx.font = '15px sans-serif';
  ctx.fillStyle = 'rgba( 255, 255, 255, 0.7 )';
  ctx.textAlign = 'left';
  ctx.fillText( 'MIN: ' + minVal.toLocaleString( 'en-US' ) + ' ' + currency, margenW + 10, margenH + alto - 12 );
  ctx.fillText( 'MAX: ' + maxVal.toLocaleString( 'en-US' ) + ' ' + currency, margenW + 10, margenH + 23 );

  // ctx.strokeStyle = '#ccc';
  // ctx.lineWidth = 1;
  // ctx.strokeRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

  // ctx.clearRect( 0, 0, 200, 200 );

};

