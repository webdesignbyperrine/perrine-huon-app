import Link from 'next/link';
import type { Metadata } from 'next';
import RootDocument from '@/components/RootDocument';
import frCommon from '@/messages/fr/common.json';

// Same tab title the 404 page had when it was rendered inside the [locale]
// layout (French default title).
export const metadata: Metadata = {
  title: frCommon.metadata.title,
};

export default function NotFound() {
  // The root layout is a pass-through, so this global 404 renders its own
  // document. Its copy is French, hence lang="fr".
  return (
    <RootDocument lang="fr">
      <div className="min-h-screen flex items-center justify-center bg-paper-light">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-primary/60 mb-8">Page non trouvée</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </RootDocument>
  );
}
