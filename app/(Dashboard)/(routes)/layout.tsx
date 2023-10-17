import AdminNav from '@/components/admin-components/admin-nav';
import { currentUser, isAdmin } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user || user.role === 'USER') {
    redirect('/');
  }

  return (
    <div className='mx-auto max-w-screen-2xl'>
      <AdminNav user={user} />
      {children}
    </div>
  );
}
