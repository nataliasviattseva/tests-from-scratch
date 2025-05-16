import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../src/components/UserList';
import { server } from '../src/mocks/browser';
import { http } from 'msw';

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
            http.get('/users', () => {
                return new Response(JSON.stringify({ error: 'Server Error' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            })
        );

        render(<UserList />);

        // Attendre l’alerte d’erreur 
        const alert = await screen.findByRole('alert');
        expect(alert).toHaveTextContent('Erreur : Erreur réseau');
    });
});
