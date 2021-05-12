const { Pool } = require('pg');
require("dotenv").config();

class Database {
  constructor() {
    this.config = {
      user: "postgres",
      host: "localhost",
      database: "hood",
      password: "emazeb32",
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