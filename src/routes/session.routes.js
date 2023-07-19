import { Router } from 'express';
import userModel from '../dao/models/user.model.js';

const router = Router();

// Create ("C".R.U.D) Registrar usuario

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

// Create ("C".R.U.D) Buscar al usuario en la base de datos

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { session } = req;
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: session.routes.js:30 ~ router.login ~ session:', session);

    const findUser = await userModel.findOne({ email });
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: session.routes.js:34 ~ router.login ~ findUser:', findUser);

    if (!findUser) {
      return res.status(401).json({ message: 'Usuario no registrado o existente' });
    }

    if (findUser.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    req.session.user = {
      ...findUser,
      password: '',
    };

    return res.redirect('/products');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('🚀 ~ file: session.routes.js:57 ~ router.login ~ error:', error);
    return res.status(401).json({ message: 'Error al entrar al login' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      return res.redirect('/login');
    }
    return res.status(500).json({ message: 'Error al cerrar sesión' });
  });
});

export default router;
