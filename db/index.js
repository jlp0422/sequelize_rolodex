const Sequelize = require('sequelize');
const pg = require('pg')
const _conn = new Sequelize(process.env.DATABASE_URL);

const Contact = _conn.define('contact', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING
  },
  company: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.BIGINT,
    validate: {
      isNumeric: true,
      isInt: true,
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

const sync = () => {
  return _conn.sync({force: true});
};

const seed = () => {
  return Promise.all([
    Contact.create({ firstName: 'Cosmo', lastName: 'Kramer', company: 'Vandelay Industries', number: 6465558383 }),
    Contact.create({ firstName: 'Eugene', lastName: 'Krabs', company: 'Krusty Krab', number: 7158203420 }),
    Contact.create({ firstName: 'Michael', lastName: 'Scott', company: 'Dunder Mifflin', number: 3087864983 })
  ])
};

module.exports = {
  sync,
  seed,
  models: {
    Contact
  }
}
