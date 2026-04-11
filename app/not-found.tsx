import Link from 'next/link';

export default function NotFound() {
  return (
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
  );
}
