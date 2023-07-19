const authMdw = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Validando Sesion');

  if (req.session?.user) {
    return next();
  }
  return res.redirect('/login');
};

export default authMdw;
