import { http } from 'msw';
import { User } from '../hooks/useUsers';

let users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

export const handlers = [
    // GET /users 
    http.get('/users', ({ request, params, cookies }) => {
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }),

    // POST /users 
    http.post('/users', async ({ request }) => {
        const body = await request.json();
        const { name } = body as { name: string };

        if (!name) {
            return new Response(JSON.stringify({ error: 'name is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newUser = { id: users.length + 1, name };
        users.push(newUser);

        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    }),
];