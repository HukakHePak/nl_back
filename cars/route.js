const express = require('express');
const authorization = require('./middlewares/authorization');

const router = express.Router();
const db = require('./mysql');

router.use(authorization);

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
