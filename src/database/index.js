const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CLUSTER = process.env.DB_CLUSTER;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Conexão com o MongoDB realizada');
  })
  .catch((error) => {
    console.log('Falha de autenticação com o MongoDB');
    console.log(error);
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;