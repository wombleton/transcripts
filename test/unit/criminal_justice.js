var _ = require('lodash'),
    helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var speech = debate.sections[0];

    test.equals(debate.title, 'Criminal Justice Reform Bill — In Committee');

    test.equals(_.first(speech.headings), 'Criminal Justice Reform Bill');

    test.equals(speech.events[1].contributions.length, 9);
    test.equals(speech.events[1].speeches.length, 1);

    test.done();
  });
};
