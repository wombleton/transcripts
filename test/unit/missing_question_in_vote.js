var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    test.equals(debate.title, 'Electoral Finance Bill — First Reading');

    test.equals(debate.sections[0].events[0].question, 'A party vote was called for on the question, That the Electoral Finance Bill be now read a first time');
    test.ok(!debate.sections[0].events[0].call);
    test.done();
  });
};

