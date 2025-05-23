// src/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/users', (_req, res, ctx) => {
    console.log('MSW handler /users called');
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
    );
  }),
];
