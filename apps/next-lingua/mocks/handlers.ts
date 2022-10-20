import { rest } from 'msw';

const users = [
  {
    word: '0_1 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_2 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_3 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_4 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_5 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_6 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_7 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_8 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_9 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_10 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_x1 Aaaaaaaa',
    series: 0,
  },
  {
    word: '0_x2 Aaaaaaaa',
    series: 0,
  },
  {
    word: '1_1 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_2 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_3 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_4 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_5 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_6 Bbbbbbbb',
    series: 1,
  },
  {
    word: '1_x Bbbbbbbb',
    series: 1,
  },
  {
    word: '2_1 Cccccccc',
    series: 2,
  },
  {
    word: '2_2 Cccccccc',
    series: 2,
  },
  {
    word: '2_3 Cccccccc',
    series: 2,
  },
  {
    word: '2_x Cccccccc',
    series: 2,
  },
  {
    word: '3_1 Dddddddddd',
    series: 3,
  },
  {
    word: '3_x Dddddddddd',
    series: 3,
  },
  {
    word: '4_1 Eeeeeeeee',
    series: 4,
  },
  {
    word: '4_x Eeeeeeeee',
    series: 4,
  },
  {
    word: '5 Ffffffffff',
    series: 5,
  },
  {
    word: '5 Ggggggggg',
    series: 5,
  },
  {
    word: '5 Hhhhhhhhhh',
    series: 5,
  },
];

export const handlers = [
  //   rest.get('/api/reviews', (req, res, ctx) => {
  rest.get('http://localhost:4200/users', (req, res, ctx) => {
    // return res(ctx.status(200), ctx.json(data));
    return res(ctx.status(200), ctx.json(users));
  }),
];