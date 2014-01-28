var _ = require('underscore'),
    cheerio = require('cheerio'),
    Event = require('./Event');

function Section(block) {
  this.block = cheerio(block);
  this.section = {};
}

Section.prototype.parse = function() {
  this.extractHeading();

  this.section.type = this.extractType();

  if (this.section.type === 'section') {
    this.extractSections();
  } else {
    this.extractEvents();
  }

  return this.section;
};

Section.prototype.extractType = function() {
  var cls = this.block.attr('class').toLowerCase();

  if (_.contains(['debate'], cls)) {
    return 'section';
  } else {
    return 'eventlist';
  }
}

Section.prototype.extractHeading = function() {
  this.section.heading = this.block.prev('h1, h2, h3').text();
};

Section.prototype.extractSections = function() {
  var blocks = this.block.children('h1 + div, h2 + div, h3 + div');

  this.section.sections = _.map(blocks, function(block) {
    return new Section(block).parse();
  });
};

Section.prototype.extractEvents = function() {
  var blocks = this.block.children('div');

  this.section.events = _.map(blocks, function(block) {
    return new Event(block).parse();
  });
};

module.exports = Section;
