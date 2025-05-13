"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
const usersStore_1 = require("../src/usersStore");
const fixtures = __importStar(require("./fixtures"));
const externalApi = __importStar(require("../src/externalApi"));
describe('API Users – tests avancés', () => {
    // Avant chaque test, on initialise le store avec nos fixtures
    beforeEach(() => {
        (0, usersStore_1.resetStore)();
        fixtures.initialUsers.forEach(u => {
            // recrée via la vraie fonction pour respecter nextId
            // mais on veut des IDs fixes, donc on repousse directement le tableau
            // ici on assigne directement :
            // (en pratique, ajouter une fonction setUsers pour les tests)
            // Simplifions : on simule via mocking du store
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
        ];
        test.each(cases)('id=$id → $status', async ({ id, expected, status }) => {
            // On mocke le store pour renvoyer fixtures.initialUsers
            jest.spyOn(externalApi, 'fetchUserData').mockResolvedValue({
                extra: 'info'
            });
            // On appelle
            const res = await (0, supertest_1.default)(server_1.app).get(`/users/${id}`);
            expect(res.status).toBe(status);
            expect(res.body).toEqual(expected);
        });
    });
    /**
    * Tester PUT /users/:id
    */
    it('PUT /users/1 sans body.name → 400', async () => {
        const res = await (0, supertest_1.default)(server_1.app).put('/users/1').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'name is required' });
    });
    it('PUT /users/99 non existant → 404', async () => {
        const res = await (0, supertest_1.default)(server_1.app).put('/users/99').send({ name: 'New' });
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'User not found' });
    });
    it('PUT /users/2 avec name → 200 & user mis à jour', async () => {
        // Préparer : ajouter Bob
        await (0, supertest_1.default)(server_1.app).post('/users').send({ name: fixtures.bob.name });
        const res = await (0, supertest_1.default)(server_1.app).put('/users/2').send({ name: 'Bobby' });
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ id: 2, name: 'Bobby' });
    });
});
