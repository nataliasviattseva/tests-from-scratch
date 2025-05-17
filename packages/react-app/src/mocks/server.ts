import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Handlers par défaut
export const handlers = [
  http.get('/users', () =>
    HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ])
  ),
];

export const server = setupServer(...handlers);
