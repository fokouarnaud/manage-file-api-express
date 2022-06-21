const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "fokou2014",
    database: "api_doc_db",
    connectionLimit : 10,
  },
  dbo: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "us-cdbr-east-05.cleardb.net",
    user: "b7baa28aa75f16",
    password: "8cbff95e",
    database: "heroku_80cb0a389fdca38",
    connectionLimit : 10,
  },
  listPerPage: 10,
};

module.exports = config;
