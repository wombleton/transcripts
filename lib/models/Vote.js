var _ = require('lodash'),
    cheerio = require('cheerio');

function Vote(block, event) {
  this.block = block;
  this.event = event;
}

Vote.prototype.extractCall = function() {
  var call = this.block.contents().filter(function(i, c) {
    return c.type === 'text';
  }).text().trim();

  this.event.call = call.replace(/,$/, '');
};

Vote.prototype.extractQuestion = function() {
  this.event.question = this.block.children('em').text().trim();
};

Vote.prototype.extractVotes = function() {
  var voteTables = this.block.children('table.vote');

  this.event.result = this.block.children('.VoteResult').text().trim();

  _.each(voteTables, function(table) {
    var label,
        teller;

    table = cheerio(table);

    label = _.first(table.children('caption').text().split(' ')).trim().toLowerCase();


    if (_.contains(['ayes', 'noes', 'abstentions'], label)) {
      this.event[label] = [];

      _.each(table.find('td'), function(cell) {
        var text = cheerio(cell).text().trim(),
            match = text.match(/([^(]+)( ?\(P\))?$/),
            name = match && match[1],
            present = match && !!match[2];

        if (name && !/^Teller:?$/.test(name)) {
          this.event[label].push({
            name: name,
            present: present
          });
        }
      }, this);

      teller = _.last(this.event[label])
      teller.teller = true;
      teller.present = true;
    }
  }, this);
};

Vote.prototype.parse = function() {
  this.extractCall();
  this.extractQuestion();
  this.extractVotes();

  return this.event;
};

module.exports = Vote;
