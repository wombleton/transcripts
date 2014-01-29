var cheerio = require('cheerio'),
    Procedural = require('./Procedural'),
    Speech = require('./Speech'),
    Vote = require('./Vote');

function Event(block) {
  this.block = cheerio(block);
}

Event.prototype.parse = function() {
  var event;

  this.event = {};

  this.extractType();

  if (this.event.type === 'speech') {
    event = new Speech(this.block, this.event);
  } else if (this.event.type === 'procedural') {
    event = new Procedural(this.block, this.event);
  } else if (this.event.type === 'partyvote') {
    event = new Vote(this.block, this.event);
  } else if (this.event.type === 'personalvote') {
    event = new Vote(this.block, this.event);
  }

  if (event) {
    event.parse();
  }

  return this.event;
};

Event.prototype.extractType = function() {
  var type = this.block.attr('class').toLowerCase();

  if (!type && this.block.is('ul')) {
    this.event.type = 'procedural';
  } else {
    this.event.type = type;
  }
};

Event.prototype.setHeading = function() {
  this.event.heading = this.block.prev().text();
}

module.exports = Event;
