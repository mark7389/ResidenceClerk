const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');

module.exports = function(user, password){

      user = encodeURIComponent(user);
      password = encodeURIComponent(password);
      return MongoClient.connect(`mongodb://${user}:${password}@ds249737.mlab.com:49737/${config.db}`);

}