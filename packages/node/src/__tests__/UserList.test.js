"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const UserList_1 = require("../src/components/UserList");
const browser_1 = require("../src/mocks/browser");
const msw_1 = require("msw");
describe('UserList Component', () => {
    it('affiche le loader puis la liste d’utilisateurs', async () => {
        (0, react_2.render)(<UserList_1.UserList />);
        // 1. Le loader apparaît
        expect(react_2.screen.getByRole('status')).toHaveTextContent('Chargement...');
        // 2. Attendre que les items s’affichent
        const items = await react_2.screen.findAllByRole('listitem');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Alice');
        expect(items[1]).toHaveTextContent('Bob');
    });
    it('affiche une erreur si l’API échoue', async () => {
        // On override le handler pour renvoyer 500
        browser_1.server.use(msw_1.rest.get('/users', (_req, res, ctx) => {
            return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
        }));
        (0, react_2.render)(<UserList_1.UserList />);
        // Attendre l’alerte d’erreur
        const alert = await react_2.screen.findByRole('alert');
        expect(alert).toHaveTextContent('Erreur : Erreur réseau');
    });
});
