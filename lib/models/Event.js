var cheerio = require('cheerio'),
    Speech = require('./Speech');

function Event(block) {
  this.block = cheerio(block);
}

Event.prototype.parse = function() {
  this.event = {};

  this.extractType();

  if (this.event.type === 'speech') {
    return new Speech(this.block, this.event).parse();
  }

  return this.event;
};

Event.prototype.extractType = function() {
  this.event.type = this.block.attr('class').toLowerCase();
};

Event.prototype.setHeading = function() {
  this.event.heading = this.block.prev().text();
}

module.exports = Event;
