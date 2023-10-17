import UpdateUserForm from '@/components/admin-components/admin-user-components/update-product-form';
import { db } from '@/lib/db';
export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await db.user.findUnique({
    where: { id: params.userId },
  });

  return <UpdateUserForm user={user} />;
}
