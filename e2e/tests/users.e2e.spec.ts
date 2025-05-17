import { test, expect } from '@playwright/test';

test.describe('E2E – Users flow', () => {

    test.beforeEach(async ({ request }) => {
        // Reset uniquement ici, une seule fois avant chaque test
        await request.post('http://localhost:3001/__reset__');
    });

    test('Créer et lister un utilisateur', async ({ page }) => {

        // Reset backend avant chaque test
        await page.request.post('http://localhost:3001/__reset__');

        // 1. Aller sur la page d’accueil
        await page.goto('http://localhost:3000');

        // Vérifier le titre ou un élément clé
        await expect(page.getByRole('heading', { name: /utilisateurs/i })).toBeVisible();

        // 2. Saisir le nom
        const input = page.getByLabel('Nom :');
        await input.fill('Diane');

        // 3. Cliquer sur le bouton "Créer"
        const créer = page.getByRole('button', { name: 'Créer' });
        const [response] = await Promise.all([
            page.waitForResponse(resp => resp.url().endsWith('/users') && resp.request().method() === 'POST'),
            créer.click(), // important : déclenchement ici
        ]);

        // 4. Attendre la requête POST /users et vérifier le statut
        expect(response.status()).toBe(201);

        // 5. Vérifier que la liste contient "Diane"
        // Attendre qu'au moins 1 <li> apparaisse
        await page.waitForSelector('li');

        // Ensuite, tu peux vérifier leur contenu
        const items = page.getByRole('listitem');
        await expect(items).toContainText(['Diane']);
    });
});