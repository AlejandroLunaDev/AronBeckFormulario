'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';

export function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button variant='outline' onClick={() => signOut()}>
        Sair ({session.user?.name})
      </Button>
    );
  }

  return <Button onClick={() => signIn('google')}>Entrar com Google</Button>;
}
