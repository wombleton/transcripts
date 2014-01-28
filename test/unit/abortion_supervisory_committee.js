var helper = require('../helper');

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

    vote = section.votes[1];

    test.done();
  });
};
