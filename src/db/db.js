const { Pool } = require('pg');
require("dotenv").config();

class Database {
  constructor() {
    this.config = {
      user: "ojlwsnxm",
      host: "rogue.db.elephantsql.com",
      database: "ojlwsnxm",
      password: "RKAPePIdy9pAlBbc9p9nc-2cwmMa-xkw",
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