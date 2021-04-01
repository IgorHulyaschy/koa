const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      user: 'nfdcadmj',
      host: 'queenie.db.elephantsql.com',
      database: 'nfdcadmj',
      password: 'mq8nKqqS5zbdVQXCA8Tg2RHtJ9ZrTEcA',
      port: 5432,
    };

    this.pool = new Pool(this.config);
  }

  query(sql) {
    return this.pool.query(sql);
  }

  close() {
    this.pool.end();
  }
}

module.exports = new Database();