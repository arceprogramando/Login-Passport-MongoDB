import { Router } from 'express';

const router = Router();

router.get('/api/cookie', (req, res) => {
  // res.cookie(nombre_de_la_cookie,valor_de_la_cookie,{maxAge:tiempo_de_vida_en_milisegundos})
  res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', { maxAge: 10000, signed: true }).send('cookie');
});

router.post('/api/cookies/create', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Body**** ', req.body);

  res.cookie(
    'cookieUser',
    { user: `${req.body.email}` },
    { maxAge: 20000 },
  ).send();
});

export default router;
