const Sql = require('sequelize');

const client = new Sql(process.env.DATABASE_URL);

const User = client.define('user', {
  name: {
    type: Sql.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const initialUsers = ['superman', 'spiderman', 'batman'];

const sync = () => {
  return client.sync({ force: true });
};

const seedInitial = () => {
  return Promise.all(initialUsers.map(name => User.create( {name} )));
};

const seed = () => {
  return seedInitial();
};

module.exports = {
  seed,
  sync,
  models: {
    User
  }
};
