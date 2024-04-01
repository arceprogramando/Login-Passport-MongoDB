import SessionDao from '../dao/session.dao.js';

class SessionService {
  constructor() {
    this.sessionDao = new SessionDao();
  }

  updateSessionCounter = async (session) => {
    try {
      const updatedSession = { ...session };
      let message;
      if (updatedSession.counter && updatedSession.counter > 0) {
        updatedSession.counter += 1;
        message = `Se ha visitado el sitio ${updatedSession.counter} veces`;
      } else {
        updatedSession.counter = 1;
        message = 'Bienvenido';
      }
      return message;
    } catch (error) {
      throw new Error('Error al aumentar la sesión en el servicio');
    }
  };
}

export default SessionService;
