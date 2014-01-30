var _ = require('lodash'),
    helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var committee,
        contribution,
        reading,
        speech,
        readingSpeech;

    test.equals(debate.title, 'Bail Amendment Bill — In Committee, Third Reading');

    test.equals(debate.sections.length, 2);

    committee = _.first(debate.sections);

    test.equals(_.first(committee.headings), 'Bail Amendment Bill');

    speech = _.first(committee.events);

    test.equals(speech.heading, 'In Committee');

    reading = _.last(debate.sections);

    test.equals(_.first(reading.headings), 'Third Reading');

    readingSpeech = _.first(reading.events);

    test.equals(_.first(readingSpeech.speeches).by, 'Hon JUDITH COLLINS (Minister of Justice)');

    test.done();
  });
};
