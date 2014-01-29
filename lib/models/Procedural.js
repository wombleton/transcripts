var _ = require('lodash'),
    cheerio = require('cheerio');

function Procedural(block, event) {
  this.block = block;
  this.event = event;
}

Procedural.prototype.extractHeading = function() {
  this.event.heading = this.block.prev('h1, h2, h3').text();
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
