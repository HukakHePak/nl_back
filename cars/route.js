const cookieSession = require('cookie-session');
const express = require('express');

const router = express.Router();
const db = require('./mysql');

router.use(cookieSession({
  name: 'cars_app_cookies',
  secret: process.env.CARS_SECRET,
  // maxAge: 7 * 24 * 60 * 60 * 1000, // week
  maxAge: 60 * 60 * 1000, // hour
}));

router.post('/login', (req, res) => {
  const { login, password } = req.body || {};

  if (!login || !password) {
    res.status(403).send('invalid_form');
    return;
  }

  db.call('authorize', [login, password])
    .then((user) => {
      req.session.user = user;
      res.send(user);
    })
    .catch((error) => res.status(403).send(error));
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.send();
});

router.use((req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }

  res.redirect('/login');
});

router.get('/me', (req, res) => {
  const { login, password } = req.session.user;

  db.call('authorize', [login, password])
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        req.session = null;
        res.status(403).send();
      }
    })
    .catch((error) => res.status(403).send(error));
});

router.get('/help', (req, res) => {
  // TODO: list of accepted procedures and docs them
  res.send('ok');
});

router.post('/:movement/:name', (req, res) => {
  const { params, body } = req;
  const { movement, name } = params;

  if (['exec', 'call'].includes(movement)) {
    db[movement](name, body)
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(404);
  }
});

module.exports = router;
