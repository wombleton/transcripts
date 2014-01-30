var _ = require('lodash'),
    cheerio = require('cheerio');

function Procedural(block, event) {
  this.block = block;
  this.event = event;
}

Procedural.prototype.extractHeading = function() {
  var header = this.block.prev();

  if (header.is('h1, h2, h3')) {
    this.event.heading = header.text();
  }
};

Procedural.prototype.extractItems = function() {
  var items = this.block.find('li');

  this.event.items = _.map(items, function(item) {
    return cheerio(item).text();
  }, this);
};

Procedural.prototype.parse = function() {
  this.extractItems();
  this.extractHeading();

  return this.event;
};

module.exports = Procedural;
