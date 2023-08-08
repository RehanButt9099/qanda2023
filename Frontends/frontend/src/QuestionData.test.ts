import { mapQuestionFromServer } from './QuestionsData';

test('When mapQuestionFromServer is called with question, created should be turned into a Date', () => {
  const result = mapQuestionFromServer({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: '2021-01-01T00:00:00.000Z',
    answers: [],
  });

  const expectedDate = new Date('2021-01-01T00:00:00.000Z').getTime();

  expect(result).toEqual({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: new Date(expectedDate),
    answers: [],
  });
});

test('When mapQuestionFromServer is called with question and answers, created should be turned into a Date', () => {
  const result = mapQuestionFromServer({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: '2021-01-01T00:00:00.000Z',
    answers: [
      {
        answerId: 1,
        content: 'test',
        userName: 'test',
        created: '2021-01-01T00:00:00.000Z',
      },
    ],
  });

  const expectedDate = new Date('2021-01-01T00:00:00.000Z').getTime();

  expect(result).toEqual({
    questionId: 1,
    title: 'test',
    content: 'test',
    userName: 'test',
    created: new Date(expectedDate),
    answers: [
      {
        answerId: 1,
        content: 'test',
        userName: 'test',
        created: new Date(expectedDate),
      },
    ],
  });
});
