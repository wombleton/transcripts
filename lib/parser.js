var Debate = require('./models/Debate'),
    cheerio = require('cheerio');

module.exports = function(html, callback) {
  var $ = cheerio.load(html),
      debate = new Debate($);

  callback(null, debate.parse());
}
