var _ = require('lodash'),
    helper = require('../helper');

exports['extracts debate'] = function(test) {
  helper.parse(__filename, function(err, debate) {
    var questions,
        question,
        speeches;

    test.equals(debate.title, 'Questions for Oral Answer — Questions to Ministers');

    test.equals(debate.sections.length, 1);

    questions = _.first(debate.sections);

    test.equals(_.first(questions.headings), 'Questions to Ministers');

    test.equals(questions.events.length, 5);

    question = _.first(questions.events);

    test.equals(question.heading, 'Education—Competition');

    speeches = question.speeches;

    test.equals(speeches.length, 5);

    test.equals(speeches[0].content, 'What');
    test.equals(speeches[0].by, 'DIANNE YATES (Labour)');
    test.equals(speeches[0].to, 'Minister of Education');

    test.equals(speeches[1].content, 'I');
    test.equals(speeches[1].by, 'Hon STEVE MAHAREY (Minister of Education)');
    test.equals(speeches[1].to, undefined);

    test.equals(speeches[2].content, 'That');
    test.equals(speeches[2].by, 'Madam SPEAKER');
    test.equals(speeches[2].to, undefined);

    test.equals(speeches[3].content, 'What');
    test.equals(speeches[3].by, 'Dianne Yates');
    test.equals(speeches[3].to, undefined);

    test.equals(speeches[4].content, 'I');
    test.equals(speeches[4].by, 'Hon STEVE MAHAREY');
    test.equals(speeches[4].to, undefined);

    test.done();
  });
};
