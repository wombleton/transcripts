var async = require('async'),
    Mongo = require('mongodb'),
    config = require('./config'),
    db;

module.exports = {
    init: function(callback) {
        if (!config.valid()) {
            return callback("Set valid DB variables in the .env file.");
        }

        Mongo.MongoClient.connect(config.DB_PATH, function(err, database) {
            if (err) {
                console.log(err);
                return callback(err);
            }

            db = database;
            module.exports.createSchema(db, callback);
        });
    },
    getGridStore: function(path, mode, options) {
        return new Mongo.GridStore(db, path, mode, options);
    },
    getId: function(id) {
        if (id && id.length === 24) {
            return Mongo.ObjectID(id);
        } else {
            return id;
        }
    },
    ObjectID: Mongo.ObjectID,
    getDb: function() {
        return db;
    },
    createSchema: function(db, callback) {
        async.forEach([
            'people',
            'speeches'
        ], createCollection, function(err) {
          callback(err, db);
        });
    },
    close: function() {
        if (db) {
            db.close();
        }
    },
    coll: function(name) {
        if (db) {
            return db.collection(name);
        } else {
            return null;
        }
    }
}

/**
 * create a collection. Relies on db being already assigned.
 */
function createCollection(name, callback) {
  db.createCollection(name, function(err) {
    if (!err) {
      console.log("Successfully created collection %s.", name);
    }
    callback(err);
  });
}
