import {User} from '../src/usersStore';

export const alice: User = { id: 1, name: 'Alice' };
export const bob: User = { id: 2, name: 'Bob' };
export const charlie: User = { id: 3, name: 'Charlie' };
export const david: User = { id: 4, name: 'David' };
export const eve: User = { id: 5, name: 'Eve' };
export const frank: User = { id: 6, name: 'Frank' };
export const grace: User = { id: 7, name: 'Grace' };
export const heidi: User = { id: 8, name: 'Heidi' };
export const ivan: User = { id: 9, name: 'Ivan' };
export const judy: User = { id: 10, name: 'Judy' }; 

// Tableau complet pour initialiser le store
export const initialUsers: User[] = [
    alice,
    bob,
    charlie,
    david,
    eve,
    frank,
    grace,
    heidi,
    ivan,
    judy
];
