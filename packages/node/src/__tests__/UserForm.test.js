"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const UserForm_1 = require("../src/components/UserForm");
describe('UserForm Component', () => {
    it('appel onCreated avec le bon nom au submit', async () => {
        const onCreated = jest.fn();
        (0, react_2.render)(<UserForm_1.UserForm onCreated={onCreated}/>);
        // 1. Saisir un nom
        const input = react_2.screen.getByLabelText('Nom :');
        await user_event_1.default.type(input, 'Charlie');
        // 2. Soumettre le formulaire
        const button = react_2.screen.getByRole('button', { name: 'Créer' });
        await user_event_1.default.click(button);
        // 3. Vérifier appel de callback
        expect(onCreated).toHaveBeenCalledTimes(1);
        expect(onCreated).toHaveBeenCalledWith('Charlie');
    });
    it('ne doit pas appeler onCreated si input vide', async () => {
        const onCreated = jest.fn();
        (0, react_2.render)(<UserForm_1.UserForm onCreated={onCreated}/>);
        // Soumettre sans rien saisir
        const button = react_2.screen.getByRole('button', { name: 'Créer' });
        await user_event_1.default.click(button);
        expect(onCreated).not.toHaveBeenCalled();
    });
});
