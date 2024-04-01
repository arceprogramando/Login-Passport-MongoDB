import { Router } from 'express';
import userModel from '../models/user.model.js';
import SessionController from '../controllers/session.controller.js';

const router = Router();

const sessionController = new SessionController();

router.get('/', sessionController.getSession);

router.post('/register', async (req, res) => {
  try {
    const { body } = req;
    const newUser = await userModel.create(body);
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: session.routes.js:13 ~ router.post ~ newUser:', newUser);
    req.session.user = { ...body };
    return res.render('login');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: session.routes.js:22 ~ router.post ~ error:', error);
    return res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: 'Usuario no registrado o existente' });
    }

    if (findUser.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session.user = {
        ...findUser,
        password: '',
        admin: true,
      };
    } else {
      req.session.user = {
        ...findUser,
        password: '',
        admin: false,
      };
    }

    return res.redirect('/products');
  } catch (error) {
    return res.status(401).json({ message: 'Error al entrar al login' });
  }
});

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
