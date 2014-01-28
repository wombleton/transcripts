var _ = require('lodash'),
    helper = require('../helper');

exports['extracts title'] = function(test) {
  helper.parse(__filename, function(err, speech) {
    test.equals(speech.title, 'Appointments — Abortion Supervisory Committee');
    test.equals(speech.volume, '639');
    test.equals(speech.page, '9906');
    test.done();
  });
};

exports['parse debate section'] = function(test) {
  helper.parse(__filename, function(err, s) {
    var section,
        event,
        speech,
        vote;

    test.ok(s.sections);
    test.equals(s.sections.length, 1);

    section = s.sections[0];
    test.equals(section.heading, 'Appointments');

    test.ok(section.events);
    test.equals(section.events.length, 4);

    event = section.events[0];

    test.equals(event.heading, 'Abortion Supervisory Committee');

    test.ok(event.speeches);
    test.equals(event.speeches.length, 1);

    speech = event.speeches[0];

    test.equals(speech.by, 'Hon MARK BURTON (Minister of Justice)');
    test.equals(speech.content, 'I move,');

    vote = section.events[1];
    test.equals(vote.type, 'personalvote');
    test.equals(vote.call, 'A personal vote was called for on the question');
    test.equals(vote.question, 'That the motion be amended by omitting the words “Dr Rosemary Jane Fenwicke of Wellington”, and substituting the words “Dr Ate Moala of Wellington”.');
    test.ok(_.isArray(vote.ayes));
    test.equals(vote.ayes.length, 36);
    test.equals(vote.ayes[0].name, 'Ardern');
    test.equals(vote.ayes[0].teller, undefined);
    test.equals(vote.ayes[0].present, true);

    test.equals(vote.ayes[1].name, 'Copeland');
    test.equals(vote.ayes[1].teller, undefined);
    test.equals(vote.ayes[1].present, false);

    test.equals(vote.ayes[35].name, 'Tolley');
    test.equals(vote.ayes[35].present, true);
    test.equals(vote.ayes[35].teller, true);

    test.ok(_.isArray(vote.noes));

    test.equals(vote.result, 'Amendment not agreed to.');

    test.equals(section.events[3].abstentions.length, 5);

    test.done();
  });
};
