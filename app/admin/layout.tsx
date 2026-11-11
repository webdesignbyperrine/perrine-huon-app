import RootDocument from '@/components/RootDocument';
import AdminShell from './AdminShell';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootDocument lang="fr">
      <AdminShell>{children}</AdminShell>
    </RootDocument>
  );
}
