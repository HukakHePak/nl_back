const express = require('express');

const router = express.Router();
const db = require('../mysql');
const executes = require('../constants/executes');
const { unauth } = require('../constants/access');
const { P } = require('../constants/type');

router.post('/:name', (req, res) => {
  const {
    params: { name },
    body,
  } = req;

  const { access, type } = executes[name] || {};

  if (access.includes(req.session?.user?.type) || access === unauth) {
    const func = type === P ? db.call : db.exec;

    func(name, body)
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(403);
  }
});

const execution = router;

module.exports = execution;
