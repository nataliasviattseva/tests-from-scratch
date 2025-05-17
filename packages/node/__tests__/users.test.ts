// __tests__/users.test.ts
import request from 'supertest';
import { app } from '../src/server';
import { resetStore } from '../src/usersStore';

/**
 * Tests de l'API Users
 *
 * On utilise supertest pour tester l'API.
 * On ne fait pas de mock ici, on teste le serveur complet.
 *
 * On utilise le TDD (Test Driven Development) pour écrire les tests avant
 * d'implémenter le code.
 */
describe('API Users – TDD complet', () => {

    // Avant chaque test, on remet le store à zéro
    beforeEach(() => {
        resetStore();
    });

    /**
    * Scénario 1: Liste vide au démarrage
    *
    * - Red: on écrit le test avant le code (il échoue).
    * - Green: on a déjà implémenté GET /users pour qu'il passe.
    */
    it('GET /users → 200 & []', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200); // on vérifie le code HTTP
        expect(res.body).toEqual([]); // la liste doit être vide
    });
    
    /**
    * Scénario 2: Erreur si name manquant
    *
    * Test d’erreur pour valider la partie validation.
    */
    it('POST /users sans name → 400 & { error }', async () => {
        const res = await request(app)
            .post('/users')
            .send({}); // body vide
        expect(res.status).toBe(400); // code Bad Request
        expect(res.body).toEqual({ // message d’erreur exact
            error: 'name is required'
        });
    });
    
    /**
    * Scénario 3: Création d’un utilisateur
    *
    * - Green: implémentation minimale dans users.ts.
    * - Vérifie que l’ID est 1 (resetStore) et que name est renvoyé.
    */
    it('POST /users avec name → 201 & nouvel user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'Alice' });
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            id: 1,
            name: 'Alice'
        });
    });
    
    /**
    * Scénario 4: GET après création
    *
    * On crée Alice, puis on rappelle GET /users pour vérifier qu’elle
    * apparaît bien dans la liste.
    */
    it('GET /users après création → liste avec Alice', async () => {
        await request(app)
        .post('/users')
        .send({ name: 'Alice' });

        // On rappelle GET /users pour vérifier qu’Alice est bien dans la liste
        const res = await request(app).get('/users');
        
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { id: 1, name: 'Alice' }
        ]);
    });
});
