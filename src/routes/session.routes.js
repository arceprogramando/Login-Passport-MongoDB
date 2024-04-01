import { Router } from 'express';
import userModel from '../models/user.model.js';
import SessionController from '../controllers/session.controller.js';

const router = Router();

const sessionController = new SessionController();

router.get('/', sessionController.getSession);

router.post('/register', sessionController.registerUser);

router.post('/login', sessionController.LoginUser);

router.get('/welcome', async (req, res) => {
  const { name } = req.query;
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: session.routes.js:69 ~ router.get ~ name:', name);

  const counter = req.session?.counter;

  if (!counter) {
    req.session.counter = 1;
    return res.send(`Te damos la bienvenida ${name}`);
  }

  req.session.user = name;
  req.session.counter += 1;

  return res.send(`Has ingresado ${name} exitosamente, unas ${req.session.counter} veces`);
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      return res.redirect('/');
    }
    return res.status(500).json({ status: 'Error al cerrar sesión', body: error });
  });
});

export default router;
