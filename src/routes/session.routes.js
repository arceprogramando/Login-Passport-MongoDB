import { Router } from 'express';
import SessionController from '../controllers/session.controller.js';

const router = Router();

const sessionController = new SessionController();

router.get('/', sessionController.getSession);

router.post('/register', sessionController.registerUser);

router.post('/login', sessionController.LoginUser);

router.get('/logout', sessionController.logoutUser);

export default router;
