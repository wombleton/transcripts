var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var memberQuestion,
        ministerQuestion;

    test.equals(debate.title, 'Questions for Oral Answer — Questions to Ministers, Questions to Members');

    test.equals(debate.sections.length, 1);

    ministerQuestion = debate.sections[0].events[0];

    test.equals(ministerQuestion.speeches[0].by, 'MOANA MACKEY (Labour)');
    test.equals(ministerQuestion.speeches.length, 2);

    memberQuestion = debate.sections[0].events[1];
    test.equals(memberQuestion.speeches.length, 2);

    test.done();
  });
};
