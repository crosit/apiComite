require('dotenv').config();

const config = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATA_BASE: process.env.DB_DATABASE,
  DB_PORT: process.env.DB_PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  PORT: process.env.PORT,
};

module.exports = config;
