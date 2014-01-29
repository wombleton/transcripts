var _ = require('lodash'),
    helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var section,
        procedural;

    test.equals(debate.title, 'Taxation (Annual Rates of Income Tax 2007-08) Bill (No 2), Taxation (Business Taxation, Chewing Gum and Remedial Matters) Bill, Taxation (KiwiSaver) Bill — Third Readings');

    section = debate.sections[0];
    test.equals(section.headings.length, 3);
    test.deepEqual(section.headings, [
      'Taxation (Annual Rates of Income Tax 2007-08) Bill (No 2)',
      'Taxation (Business Taxation, Chewing Gum and Remedial Matters) Bill',
      'Taxation (KiwiSaver) Bill'
    ]);

    test.equals(section.events.length, 2);

    procedural = _.first(section.events);
    test.equals(procedural.type, 'procedural');
    test.equals(procedural.items.length, 1);
    test.equals(_.first(procedural.items), 'Debate resumed.');
    test.equals(procedural.heading, 'Third Readings');

    console.log(section);
    test.done();
  });
};
