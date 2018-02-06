const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_SYNC = `
// SQLIZE HERE
`
