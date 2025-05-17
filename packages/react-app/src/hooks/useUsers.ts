// src/hooks/useUsers.ts
import { useCallback, useEffect, useState } from 'react';

export interface User { id: number; name: string }

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetchUsers = useCallback(() => {
        setLoading(true);
        fetch('/users')
            .then(res => {
                if (!res.ok) throw new Error('Erreur réseau');
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, error, refresh: fetchUsers };
}