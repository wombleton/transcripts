var _ = require('underscore'),
    cheerio = require('cheerio');

function Speech(block, event) {
  this.block = block;
  this.event = event;
}

Speech.prototype.extractHeading = function() {
  this.event.heading = this.block.prev().text();
};

Speech.prototype.extractSpeeches = function() {
  this.event.speeches = _.map(this.block.children('p'), function(p) {
    var p = cheerio(p),
        speech = {};

    speech.by = p.children('strong:first-child').text();
    speech.content = p.contents().filter(function(i, c) {
      return c.type === 'text';
    }).text().trim();

    return speech;
  });
};

Speech.prototype.parse = function() {
  this.extractHeading();
  this.extractSpeeches();

  return this.event;
};

module.exports = Speech;
