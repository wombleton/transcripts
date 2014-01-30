var _ = require('lodash'),
    cheerio = require('cheerio'),
    SectionEvent = require('./Event');

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
  var header;

  this.section.headings = [];

  header = this.block.prev();

  while (header && header.is('h1, h2, h3')) {
    this.section.headings.unshift(header.text().trim());
    header = header.prev();
  }
};

Section.prototype.extractSections = function() {
  var blocks = this.block.children('h1 + div, h2 + div, h3 + div');

  this.section.sections = _.map(blocks, function(block) {
    return new Section(block).parse();
  });
};

Section.prototype.extractEvents = function() {
  var blocks = this.block.children('div, ul, p.Speech');

  this.section.events = _.map(blocks, function(block) {
    var event;

    block = cheerio(block);

    if (block.is('p.Speech')) {
      event = new SectionEvent(block.parent());
    } else {
       event = new SectionEvent(block);
    }

    return event.parse();
  });
};

module.exports = Section;
