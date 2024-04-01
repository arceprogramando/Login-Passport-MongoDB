import { Router } from 'express';
import SessionController from '../controllers/session.controller.js';

const router = Router();

const sessionController = new SessionController();

router.get('/', sessionController.getSession);

router.post('/register', sessionController.registerUser);

router.post('/login', sessionController.LoginUser);

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      return res.redirect('/');
    }
    return res.status(500).json({ status: 'Error al cerrar sesión', body: error });
  });
});

export default router;
