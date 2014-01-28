var fs = require('fs'),
    path = require('path'),
    parser = require('../lib/parser');

module.exports = {
  parse: function(file, callback) {
    var filename = path.join('test', 'html', path.basename(file)).replace(/\.js$/, '.html');

    fs.readFile(filename, {
      encoding: 'utf8'
    }, function(err, html) {
      parser(html, callback);
    });
  }
};
