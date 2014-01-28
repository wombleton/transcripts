var db = require('./lib/db');

db.init(function(err) {
  if (err) {
    console.log(err);
  }
  db.close();
});
