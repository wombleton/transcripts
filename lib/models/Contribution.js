var _ = require('lodash'),
    cheerio = require('cheerio');

function Contribution(block, event) {
  this.block = block;
  this.event = event;
}

Contribution.prototype.extractItems = function() {
  var items = this.block.find('h1, h2, h3');

  this.event.items = _.map(items, function(item) {
    return cheerio(item).text().trim();
  }, this);
};

Contribution.prototype.parse = function() {
  this.extractItems();

  return this.event;
};

module.exports = Contribution;

