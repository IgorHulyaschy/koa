const { Pool } = require('pg');

class Database {
  constructor() {
    this.config = {
      user: 'zvmhlogr',
      host: 'queenie.db.elephantsql.com',
      database: 'zvmhlogr',
      password: 'kDP8IoPaFXFaH6idyK8r5TrB17Ua2nlt',
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