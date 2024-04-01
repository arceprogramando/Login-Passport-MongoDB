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

  registerUser = async (req, res) => {
    try {
      const { body } = req;

      const existingUser = await this.sessionService.findUserByEmail(body.email);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      await this.sessionService.registerUser(body);

      req.session.user = { ...body };
      return res.render('login');
    } catch (error) {
      return res.status(500).json({ message: 'There was an error registering the user' });
    }
  };
}

export default SessionController;
