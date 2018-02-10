const pg = require('pg');
const sql = require('sequelize');

const client = new sql(process.env.DATABASE_URL);

const users = client.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const sync = () => {
  return client.sync({ force: true });
}

const SQL_SEED = `
  INSERT INTO users(name) values('superman');
  INSERT INTO users(name) values('batman');
  INSERT INTO users(name) values('spiderman');
`;

const seed = () => {
  client.query(SQL_SEED, cb);
};

const sync = (cb) => {
  client.query(SQL_SYNC, cb);
};

const getUsers = (cb) => {
  client.query('SELECT * FROM users', (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows);
  });
};

const getUser = (id, cb) => {
  client.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  });
};

module.exports = {
  seed,
  sync,
  getUsers,
  getUser
};
