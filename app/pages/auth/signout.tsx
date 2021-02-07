import { useEffect } from 'react';
import { useAuth } from 'lib/useAuth';

export default function SignOut() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);
  return (
    <div>
      <h4>Signout</h4>
    </div>
  );
}
