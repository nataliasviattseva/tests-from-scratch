// mocks/handlers.ts
import { rest } from 'msw';

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

export const handlers = [
  rest.get('http://localhost:3001/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.post('http://localhost:3001/users', async (req, res, ctx) => {
    const { name } = await req.json();
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    return res(ctx.status(201), ctx.json(newUser));
  }),
];
