var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    test.equals(debate.title, 'Budget Statement — Budget Debate, Procedure');

    test.equals(debate.sections.length, 2);
    test.equals(debate.sections[0].events[0].speeches.length, 1);
    test.equals(debate.sections[0].events[1].items.length, 1);
    test.equals(debate.sections[1].events[0].speeches.length, 1);

    test.done();
  });
};
