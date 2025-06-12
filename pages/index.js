import Head from 'next/head';
import { useSession } from 'next-auth/react';
import IntroAnimation from '../components/IntroAnimation';
import Carousel from '../components/Carousel';

export default function Home() {
  const { data: session } = useSession();
  const providers = [
    { id: 8, name: 'Netflix' },
    { id: 2, name: 'Prime Video' },
    { id: 337, name: 'Disney+' },
    { id: 11, name: 'Crunchyroll' }
  ];

  return (
    <>
      <Head><title>StreamMate</title></Head>
      <IntroAnimation />
      <main>
        {session && <Carousel providerId="recommendations" title="Für dich empfohlen" />}
        <Carousel providerId="watchlist" title="Watchlist" />
        {providers.map(p => (
          <Carousel key={p.id} providerId={p.id} title={p.name} />
        ))}
      </main>
    </>
  );
}
