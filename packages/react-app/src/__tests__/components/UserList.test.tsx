import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../../components/UserList';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('UserList Component', () => {
    it('affiche le loader puis la liste d’utilisateurs', async () => {
        render(<UserList />);

        // 1. Le loader apparaît
        expect(screen.getByRole('status')).toHaveTextContent('Chargement...');

        // 2. Attendre que les items s’affichent 
        const items = await screen.findAllByRole('listitem');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Alice');
        expect(items[1]).toHaveTextContent('Bob');
    });

    it('affiche une erreur si l’API échoue', async () => {
        // On override le handler pour renvoyer 500 
        server.use(
            rest.get('http://localhost/users', (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
            })
        );

        render(<UserList />);

        // Attendre l’alerte d’erreur 
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Erreur : Network request failed');
    });
});
