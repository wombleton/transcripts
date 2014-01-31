/*jshint bitwise: false*/
var _ = require('lodash'),
    Section = require('./Section');

function Debate(doc) {
  this.doc = doc;
}

Debate.prototype.parse = function() {
  this.debate = {};

  this.extractMetaData();
  this.extractSections();

  return this.debate;
};

Debate.prototype.extractMetaData = function() {
  var ref = this.doc('[name=DocumentReference]').next().text(),
      refMatch = ref.match(/\[Volume:(\d+);Page:(\d+)\]/);

  if (refMatch) {
    this.debate.volume = refMatch[1];
    this.debate.page = refMatch[2];
  } else if (~ref.indexOf('Advance')) {
    this.debate.advance = true;
  }

  this.debate.title = this.doc('[name=DocumentTitle]').next().text();
};

Debate.prototype.extractSections = function() {
  var blocks,
      root = this.doc('.section > div').first();

  if (root.is('.QOA, .SubsQuestion')) {
    this.debate.sections = [ new Section(root).parse() ];
  } else {
    blocks = root.children('h1 + div, h2 + div, h3 + div');

    this.debate.sections = _.map(blocks, function(block) {
      var section = new Section(block);

      return section.parse();
    }, this);
  }
};

module.exports = Debate;
