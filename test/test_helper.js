var fs = require('fs'),
    path = require('path');

module.exports = {
  getHtml: function(file, callback) {
    var filename = path.join('html', path.basename(file.toString()));

    console.log(filename);
    fs.readFile(filename, {
      encoding: 'utf8'
    }, callback);
  }
};
