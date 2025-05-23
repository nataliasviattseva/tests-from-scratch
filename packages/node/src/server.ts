import express from 'express';
import cors from 'cors';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    resetStore
} from './usersStore';

/**
 * Serveur API pour gérer les utilisateurs
 *
 * On utilise Express pour créer une API REST.
 * On expose les routes pour GET, POST et PUT.
 *
 * On utilise CORS pour autoriser les requêtes cross-origin.
 * On expose uniquement en développement/test.
 */
export const app = express();

app.use(cors());
app.use(express.json());

// Expose uniquement en développement/test
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    app.post('/__reset__', (_, res) => {
        resetStore();
        res.status(204).end();
    });
}

// Routes API
// GET /users : renvoie la liste des utilisateurs
app.get('/users', (_, res) => res.json(getUsers()));

// GET /users/:id : renvoie un utilisateur par son ID
// Si l'utilisateur n'existe pas, renvoie 404
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = getUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

// POST /users : crée un nouvel utilisateur
// Si le nom est manquant, renvoie 400
// Renvoie 201 avec l'utilisateur créé
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }
    const user = createUser(name);
    res.status(201).json(user);
});

// PUT /users/:id : met à jour un utilisateur par son ID
// Si l'utilisateur n'existe pas, renvoie 404
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'name is required' });
    }

    const updated = updateUser(id, name);
    if (!updated) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updated);
});

// Ne démarre pas le serveur en test
// On exporte l'application pour les tests
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    app.listen(3001, () => {
        console.log('API running on http://localhost:3001');
    });
}
