const config = {
  db_offline: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "fokou2014",
    database: "api_doc_db",
    connectionLimit : 10,
  },
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.RDB_HOST,
    user: process.env.RDB_USER,
    password: process.env.RDB_PASSWORD,
    database: process.env.RDB_database,
    connectionLimit : 10,
  },
  listPerPage: 10,
};

module.exports = config;
