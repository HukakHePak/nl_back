const {
  admin, manager, stuff, unauth,
} = require('./access');

const { F, P } = require('./type');

const executes = {
  authorize: {
    access: [unauth],
    type: P,
  },
  change_password: {
    access: [admin],
    type: P,
  },
  show_users: {
    access: [admin],
    type: P,
  },
  get_cars: {
    access: [unauth],
    type: P,
  },
  get_users_count: {
    access: [admin, manager, stuff, unauth],
    type: F,
  },
};

module.exports = executes;
