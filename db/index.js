const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_SYNC = `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
  );
`;

const SQL_SEED = `
  INSERT INTO users(name) values('superman');
  INSERT INTO users(name) values('batman');
  INSERT INTO users(name) values('spiderman');
`;

const seed = (cb) => {
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
