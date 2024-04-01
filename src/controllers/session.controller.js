import SessionService from '../services/session.services.js';

class SessionController {
  constructor() {
    this.sessionService = new SessionService();
  }

  getSession = async (req, res) => {
    try {
      const { session } = req;
      const message = await this.sessionService.updateSessionCounter(session);
      res.send(message);
    } catch (error) {
      res.status(500).send('Error al agregar la visita');
    }
  };
}

export default SessionController;
