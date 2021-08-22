import moment from 'moment';

const formatoMensaje = (usuario: string, contenido: string) => {
  return {
    usuario,
    contenido,
    tiempo: moment().format('L h:mm a'),
  };
}

export default formatoMensaje;
