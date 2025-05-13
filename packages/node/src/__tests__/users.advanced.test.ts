import request from 'supertest';
import { app } from '../server';
import { resetStore, createUser } from '../usersStore';
import * as fixtures from './fixtures';
import * as externalApi from '../externalApi';
import type { User } from '../usersStore';

describe('API Users – tests avancés', () => {

    // Avant chaque test, on initialise le store avec nos fixtures
    beforeEach(() => {
        resetStore();

        fixtures.initialUsers.forEach((u: User) => {
            createUser(u.name);
        });
    });

    /**
    * Paramétrage : GET /users/:id pour plusieurs cas
    * */
    describe('GET /users/:id', () => {
        const cases = [
            { id: 1, expected: fixtures.alice, status: 200 },
            { id: 2, expected: fixtures.bob, status: 200 },
            { id: 3, expected: fixtures.charlie, status: 200 },
            { id: 4, expected: fixtures.david, status: 200 },
            { id: 5, expected: fixtures.eve, status: 200 },
            { id: 6, expected: fixtures.frank, status: 200 },
            { id: 7, expected: fixtures.grace, status: 200 },
            { id: 8, expected: fixtures.heidi, status: 200 },
            { id: 9, expected: fixtures.ivan, status: 200 },
            { id: 10, expected: fixtures.judy, status: 200 },
            { id: 11, expected: { error: 'User not found' }, status: 404 }
        ] as const;
        test.each(cases)('id=$id → $status', async ({ id, expected, status }) => {

            // On mocke le store pour renvoyer fixtures.initialUsers
            jest.spyOn(externalApi, 'fetchUserData').mockResolvedValue({
                extra: 'info'
            });

            // On appelle
            const res = await request(app).get(`/users/${id}`);
            expect(res.status).toBe(status);
            expect(res.body).toEqual(expected);
        });
    });

    /**
    * Tester PUT /users/:id
    */
    it('PUT /users/1 sans body.name → 400', async () => {
        const res = await request(app).put('/users/1').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'name is required' });
    });

    it('PUT /users/99 non existant → 404', async () => {
        const res = await request(app).put('/users/99').send({ name: 'New' });
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'User not found' });
    });

    it('PUT /users/2 avec name → 200 & user mis à jour', async () => {
        // Préparer : ajouter Bob
        await request(app).post('/users').send({ name: fixtures.bob.name });
        const res = await request(app).put('/users/2').send({ name: 'Bobby' });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ id: 2, name: 'Bobby' });
    });


});