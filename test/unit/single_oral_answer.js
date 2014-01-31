var helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var question;

    test.equals(debate.title, '4. Electoral Finance Bill—Regulated Period');

    test.equals(debate.sections.length, 1);
    test.equals(debate.sections[0].events.length, 1);

    question = debate.sections[0].events[0];

    test.equals(question.speeches[0].by, 'Hon BILL ENGLISH (Deputy Leader—National)');
    test.equals(question.speeches.length, 6);

    test.done();
  });
};

