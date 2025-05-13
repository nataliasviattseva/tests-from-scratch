import { test, expect } from '@playwright/test';

test.describe('E2E – Users flow', () => {
    test('Créer et lister un utilisateur', async ({ page }) => {

        // 1. Aller sur la page d’accueil
        await page.goto('/');

        // Vérifier le titre ou un élément clé
        await expect(page.getByRole('heading', { name: '/utilisateurs/i' })).toBeVisible();

        // 2. Saisir le nom
        const input = page.getByLabel('Nom :');
        await input.fill('Diane');

        // 3. Cliquer sur le bouton "Créer"
        const créer = page.getByRole('button', { name: 'Créer' });
        await créer.click();

        // 4. Attendre la requête POST /users et vérifier le statut
        const [response] = await Promise.all([
            page.waitForResponse(resp => resp.url().endsWith('/users') && resp.request().method() === 'POST'),
            // l’action ci-dessus (clic) déclenche l’appel
        ]);
        expect(response.status()).toBe(201);

        // 5. Vérifier que la liste contient "Diane"
        const items = page.getByRole('listitem');
        await expect(items).toHaveCount(1);
        await expect(items.first()).toHaveText('Diane');
    });
});