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

  LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await this.sessionService.findUserByEmail(email);

      if (!findUser) return res.status(401).json({ message: 'Usuario no registrado o existente' });

      if (findUser.password !== password) return res.status(401).json({ message: 'Contraseña incorrecta' });

      return res.redirect('/products');
    } catch (error) {
      return res.status(401).json({ message: 'Error al entrar al login' });
    }
  };

  logoutUser = async (req, res) => {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((error) => {
          if (error) {
            reject(new Error('Error al cerrar sesión'));
          } else {
            resolve();
          }
        });
      });

      return res.redirect('/');
    } catch (error) {
      return res.status(500).json({ message: 'Error al cerrar la sesión' });
    }
  };
}

export default SessionController;
