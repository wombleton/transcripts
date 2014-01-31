var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    test.equals(debate.title, 'Hazardous Substances and New Organisms (Approvals and Enforcement) Amendment Bill — Second Reading, In Committee, Third Reading');

    test.equals(debate.sections.length, 3);
    test.equals(debate.sections[2].events[0].type, 'partyvote');

    test.done();
  });
};
