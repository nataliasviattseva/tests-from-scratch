export interface User {
    id: number;
    name: string;
}
let users: User[] = [];
let nextId = 1;

/**
* Réinitialise l'état du store.
* Utile pour isoler chaque test.
*/
export function resetStore() {
    users = [];
    nextId = 1;
}

/**
* Renvoie la liste courante des users.
*/
export function getUsers(): User[] {
    return users;
}

/**
* Renvoie un utilisateur par son ID.
* Renvoie undefined si l'utilisateur n'existe pas.
* */
export function getUserById(id: number): User | undefined {
    return users.find(u => u.id === id);
}

/**
* Crée un utilisateur avec auto-incrémentation des IDs.
*/
export function createUser(name: string, forcedId?: number): User {
    const user = { id: forcedId ?? nextId++, name };
    users.push(user);
    return user;
}

/**
* Met à jour un utilisateur par son ID.
* Renvoie l'utilisateur mis à jour ou undefined si l'utilisateur n'existe pas.
*/
export function updateUser(id: number, name: string): User | undefined {
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name;
        return user;
    }
    return undefined;
}

/* istanbul ignore next */
export function updateUserName(id: number, name: string): User | undefined {
    const user = getUserById(id);
    if (user) {
        user.name = name;
    }
    return user;

}