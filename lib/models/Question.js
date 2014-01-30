var _ = require('lodash'),
    cheerio = require('cheerio');

function Question(block, event) {
  this.block = block;
  this.event = event;
}

Question.prototype.extractHeading = function() {
  var header = this.block.prev();

  if (header.is('h1, h2, h3, h4')) {
    this.event.heading = header.text();
  }
};

Question.prototype.extractSpeeches = function() {
  var speeches = this.event.speeches = [];

  _.each(this.block.children('p'), function(p) {
    var by,
        to,
        content,
        p = cheerio(p),
        speech,
        names;

    content = p.contents().filter(function(i, c) {
      return c.type === 'text' && !/\s*to the\s*/.test(c.data);
    }).text().replace(/^\s*:/, '').trim();

    if (p.attr('class') === 'a') {
      speech = _.last(speeches);
      speech.content += "\n\n" + content;
    } else {
      names = p.children('strong');
      by = cheerio(names[0]).text().replace(/^\d+\./, '').trim();
      to = cheerio(names[1]).text().trim().replace(/:/, '');
      to = to || undefined;

      speeches.push({
        by: by,
        to: to,
        content: content
      });
    }
  });
};

Question.prototype.parse = function() {
  this.extractHeading();
  this.extractSpeeches();

  return this.event;
};

module.exports = Question;
