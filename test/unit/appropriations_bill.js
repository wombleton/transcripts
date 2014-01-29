var helper = require('../helper');

exports['extracts details'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var move,
        section,
        speech,
        vote;

    test.equals(debate.title, 'Appropriation (2007/08 Estimates) Bill — Third Reading, Imprest Supply Debate');
    test.equals(debate.advance, true);

    section = debate.sections[0];
    test.equals(section.heading, 'Appropriation (2007/08 Estimates) Bill');

    test.equals(section.events.length, 2);

    speech = section.events[0];
    test.equals(speech.heading, 'Third Reading, Imprest Supply Debate');

    move = speech.speeches[0];
    test.equals(move.by, 'Hon Dr MICHAEL CULLEN (Minister of Finance)');

    test.equals(speech.speeches.length, 3);

    test.equals(speech.speeches[2].content, 'That\n\nMr\n\nThen,\n\nJohn\n\nAfter\n\nLet');

    vote = section.events[1];

    test.equals(vote.type, 'partyvote');
    test.equals(vote.ayes.length, 5);
    test.equals(vote.ayes[4].names.length, 2);
    test.equals(vote.ayes[4].names[1], 'Field');
    test.equals(vote.ayes[0].party, 'New Zealand Labour');
    test.equals(vote.ayes[0].count, 49);

    test.equals(vote.noes.length, 2);
    test.equals(vote.abstentions.length, 2);

    test.equals(vote.ayesCount, 61);
    test.equals(vote.noesCount, 50);
    test.equals(vote.abstentionsCount, 9);

    test.done();
  });
};

