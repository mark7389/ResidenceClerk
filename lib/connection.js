const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

module.exports = function(user, password){

      user = encodeURIComponent(user);
      password = encodeURIComponent(password);
      return MongoClient.connect(`mongodb://${user}:${password}${config.url}${config.db}`);

}