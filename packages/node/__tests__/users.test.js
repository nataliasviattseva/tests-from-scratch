"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// __tests__/users.test.ts
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
const usersStore_1 = require("../src/usersStore");
describe('API Users – TDD complet', () => {
    // Avant chaque test, on remet le store à zéro
    beforeEach(() => {
        (0, usersStore_1.resetStore)();
    });
    /**
    * Scénario 1: Liste vide au démarrage
    *
    * - Red: on écrit le test avant le code (il échoue).
    * - Green: on a déjà implémenté GET /users pour qu'il passe.
    */
    it('GET /users → 200 & []', async () => {
        const res = await (0, supertest_1.default)(server_1.app).get('/users');
        expect(res.status).toBe(200); // on vérifie le code HTTP
        expect(res.body).toEqual([]); // la liste doit être vide
    });
    /**
    * Scénario 2: Erreur si name manquant
    *
    * Test d’erreur pour valider la partie validation.
    */
    it('POST /users sans name → 400 & { error }', async () => {
        const res = await (0, supertest_1.default)(server_1.app)
            .post('/users')
            .send({}); // body vide
        expect(res.status).toBe(400); // code Bad Request
        expect(res.body).toEqual({
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
        const res = await (0, supertest_1.default)(server_1.app)
            .post('/users')
            .send({ name: 'Alice' });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
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
        await (0, supertest_1.default)(server_1.app).post('/users').send({ name: 'Alice' });
        const res = await (0, supertest_1.default)(server_1.app).get('/users');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
            { id: 1, name: 'Alice' }
        ]);
    });
});
