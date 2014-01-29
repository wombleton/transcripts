/*jshint bitwise: false*/
var _ = require('lodash'),
    cheerio = require('cheerio');

function Vote(block, event) {
  this.block = block;
  this.event = event;
}

Vote.prototype.extractCall = function() {
  var block,
      call;

  if (this.event.type === 'personalvote') {
    block = this.block;
  } else {
    block = this.block.find('caption p');
  }
  call = block.contents().filter(function(i, c) {
    return c.type === 'text';
  }).text().trim();

  this.event.call = call.replace(/,$/, '');
};

Vote.prototype.extractQuestion = function() {
  var block;

  if (this.event.type === 'personalvote') {
    block = this.block;
  } else {
    block = this.block.find('caption p');
  }
  this.event.question = block.children('em').text().trim();
};

Vote.prototype.extractPersonalVotes = function() {
  var voteTables = this.block.children('table.vote');

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

Vote.prototype.extractPartyVotes = function() {
  var rows = this.block.find('tbody tr');

  _.each(rows, function(row) {
    var count,
        label,
        parties,
        party,
        text,
        voteCount,
        votes;

    row = cheerio(row);

    label = _.first(row.find('.VoteCount').text().split(' ')).trim().toLowerCase();

    if (_.contains(['ayes', 'noes', 'abstentions'], label)) {
      count = 0;
      parties = this.event[label] = [];

      text = row.find('.VoteText').text().trim().replace(/\.$/, '');
      votes = text.split(';');

      _.each(votes, function(vote) {
        var match,
            names;

        vote = vote.trim();

        match = vote.match(/(.+) (\d+)/);

        if (match) {
          voteCount = parseInt(match[2], 10);
          party = match[1];

          count += voteCount;

          parties.push({
            count: voteCount,
            party: party
          });
        } else if (~vote.indexOf('Independent')) {
          match = vote.match(/Independent: (.+)/);

          names = match[1].split(',');
          names = _.map(names, function(name) {
            return name.trim();
          });
          count += names.length;

          parties.push({
            count: names.length,
            names: names,
            party: 'Independent'
          });
        }

      }, this);

      this.event[label + 'Count'] = count;
    }
  }, this);
};

Vote.prototype.extractVotes = function() {
  if (this.event.type === 'personalvote') {
    this.extractPersonalVotes();
  } else {
    this.extractPartyVotes();
  }
};

Vote.prototype.extractResult = function() {
  this.event.result = this.block.find('.VoteResult').text().trim();
}

Vote.prototype.parse = function() {
  this.extractCall();
  this.extractQuestion();
  this.extractVotes();
  this.extractResult();

  return this.event;
};

module.exports = Vote;
