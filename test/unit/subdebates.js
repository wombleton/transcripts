var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    test.equals(debate.title, 'Points of Order — Questions for Written Answer—Content of Answers, Questions for Oral Answer—Unauthenticated Statements in Questions, Chamber—Audio System, Resignation—Member for Mt Albert');

    test.equals(debate.sections.length, 4);

    test.equals(debate.sections[3].headings[0], 'Resignation—Member for Mt Albert');
    test.equals(debate.sections[3].events[0].speeches[0].by, 'JEANETTE FITZSIMONS (Co-Leader—Green)');
    test.equals(debate.sections[3].events[0].speeches[0].content, 'I raise a point of order, Mr Speaker.');

    test.done();
  });
};

