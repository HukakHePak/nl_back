const cookieSession = require('cookie-session');
const express = require('express');

const router = express.Router();
const db = require('../mysql');

router.use(
  cookieSession({
    name: 'cars_app_cookies',
    secret: process.env.CARS_SECRET || 'nullable',
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    sameSite: 'none',
    httpOnly: true,
    secure: true,
  }),
);

router.get('/logout', (req, res) => {
  req.session = null;
  res.send();
});

function authorize(params, req, res) {
  db.call('authorize', params)
    .then((user) => {
      if (user?.iduser) {
        req.session.user = user;
        res.send(user);
      } else {
        req.session = null;
        res.status(403).send('user_not_found');
      }
    })
    .catch((error) => res.status(403).send(error));
}

router.post('/login', (req, res) => {
  const { login, password } = req.body || {};

  if (!login || !password) {
    res.status(403).send('invalid_form');
  }

  authorize([login, password, true], req, res);
});

router.use((req, res, next) => {
  if (req.session.user) {
    next();
    return;
  }

  res.status(403).send('unauth');
});

router.get('/me', (req, res) => {
  const { login, password } = req.session.user;

  authorize([login, password, false], req, res);
});

const authorization = router;

module.exports = authorization;
