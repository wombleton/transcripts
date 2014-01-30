var _ = require('lodash'),
    cheerio = require('cheerio');

function Speech(block, event) {
  this.block = block;
  this.event = event;
}

function isContribution(p) {
  return p.is('.Clause-Description0');
}

Speech.prototype.extractHeading = function() {
  this.event.heading = this.block.prev().text().trim();
};

Speech.prototype.extractSpeeches = function() {
  var speeches = this.event.speeches = [];

  _.each(this.block.children('p'), function(p) {
    var by,
        content,
        p = cheerio(p),
        speech;

    if (isContribution(p)) {
      return;
    }

    content = p.contents().filter(function(i, c) {
      return c.type === 'text';
    }).text().replace(/^\s*:/, '').trim();

    if (p.attr('class') === 'a') {
      speech = _.last(speeches);
      speech.content += "\n\n" + content;
    } else {
      by = p.children('strong').text().trim().replace(/:$/, '').trim();
      speeches.push({
        by: by,
        content: content
      });
    }
  });
};

Speech.prototype.extractContributions = function() {
  var contributions = this.event.contributions = [];

  _.each(this.block.find('p.Clause-Description0, li'), function(el) {
    contributions.push(cheerio(el).text().trim());
  });
};

Speech.prototype.parse = function() {
  this.extractHeading();
  this.extractSpeeches();
  this.extractContributions();

  return this.event;
};

module.exports = Speech;
