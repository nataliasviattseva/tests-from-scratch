// src/App.tsx
import React from 'react';
import { useUsers } from './hooks/useUsers';
import { UserForm } from './components/UserForm';

export function UsersPage() {
  const { users, loading, error } = useUsers();
  const [localUsers, setLocalUsers] = React.useState(users);
  const [refreshFlag, setRefreshFlag] = React.useState(0);


  React.useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const handleCreateUser = async (name: string) => {
    try {
      const response = await fetch('http://localhost/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error('Erreur côté serveur');

      // Forcer un refresh automatique
      window.location.reload(); // simple mais efficace pour test E2E
    } catch (error) {
      console.error('Erreur POST /users :', error);
    }
  };

  const { users: updatedUsers, loading: reloadLoading, error: reloadError } = useUsers();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Utilisateurs</h1>
      <UserForm onCreated={handleCreateUser} />
      <ul>
        {localUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return <UsersPage />;
}