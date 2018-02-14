const Sequelize = require('sequelize');
const pg = require('pg')
const _conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const Contact = _conn.define('contact', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  number: {
    type: Sequelize.STRING,
    validate: {
      is: /^[0-9]+$/,
      len: 10,
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  }
},  {
  getterMethods: {
    fullName: function() {
      return `${this.firstName} ${this.lastName}`
    },
    formattedPhone: function() {
      let phone = this.number
      phone = `(${phone[0]}${phone[1]}${phone[2]})-${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`
      return phone
    }
  }
});

const sync = () => {
  return _conn.sync({force: true});
};

const seed = () => {
  return Promise.all([
    Contact.create({ firstName: 'Cosmo', lastName: 'Kramer', company: 'Vandelay Industries', number: '6465558383', email: 'cosmo@kramer.com' }),
    Contact.create({ firstName: 'Eugene', lastName: 'Krabs', company: 'Krusty Krab', number: '7158203420', email: 'krabs@krabbypatty.com' }),
    Contact.create({ firstName: 'Michael', lastName: 'Scott', company: 'Dunder Mifflin', number: '3087864983', email: 'mscott@dundermifflin.com' })
  ])
};

module.exports = {
  sync,
  seed,
  models: {
    Contact
  }
}
