import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Handlers par défaut
export const handlers = [
  rest.get('http://localhost/users', (_, res, ctx) =>
    res(ctx.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]))
  ),
];

export const server = setupServer(...handlers);
