var _ = require('lodash'),
    cheerio = require('cheerio');

function Speech(block, event) {
  this.block = block;
  this.event = event;
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

Speech.prototype.parse = function() {
  this.extractHeading();
  this.extractSpeeches();

  return this.event;
};

module.exports = Speech;
