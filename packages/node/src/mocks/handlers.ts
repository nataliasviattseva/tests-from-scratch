import { http, HttpResponse } from 'msw';
import { User } from '../hooks/useUsers';
let users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' },
    { id: 5, name: 'Eve' },
    { id: 6, name: 'Frank' },
    { id: 7, name: 'Grace' },
    { id: 8, name: 'Heidi' },
    { id: 9, name: 'Ivan' },
    { id: 10, name: 'Judy' }
];
export const handlers = [
    // GET /users
    http.get('/users', () => {
        return HttpResponse.json(users);
    }),

    // POST /users
    http.post<never, { name: string }>('/users', async ({ request }) => {
        const { name } = await request.json();

        if (!name) {
            return HttpResponse.json({ error: 'name is required' }, { status: 400 });
        }

        const newUser = { id: users.length + 1, name };
        users.push(newUser);

        return HttpResponse.json(newUser, { status: 201 });
    }),
];