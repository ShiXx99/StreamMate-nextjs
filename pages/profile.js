import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: '/api/auth/signin', permanent: false } };
  }
  return { props: { user: session.user } };
}

export default function Profile({ user }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profil von {user.email}</h1>
      <p>Hier kommen Social-Dashboard, Abo-Kosten, Statistiken & Co.</p>
    </div>
  );
}
