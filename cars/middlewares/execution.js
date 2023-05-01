const express = require('express');

const router = express.Router();
const db = require('../mysql');
const executes = require('../constants/executes');
const { unauth, developer } = require('../constants/access');
const { F } = require('../constants/type');

router.post('/:name', (req, res) => {
  const {
    params: { name },
    session,
    body,
  } = req;

  const execute = executes[name];

  if (!execute) {
    res.status(404).send('not_found');
    return;
  }

  const { access, type } = execute;

  if (access === unauth || (session?.user && (session.user.type === developer || access?.includes(session.user.type)))) {
    const func = type === F ? db.exec : db.call;

    func(name, body)
      .then((result) => res.send(result))
      .catch((error) => res.status(500).send(error));
  } else {
    res.status(403).send('access_denied');
  }
});

const execution = router;

module.exports = execution;
