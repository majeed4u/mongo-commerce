import { db } from '@/lib/db';

import {
  UserColumn,
  columns,
} from '@/components/admin-components/admin-user-components/column';
import { DataTable } from '@/components/data-table';

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  const formattedData: UserColumn[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));

  return (
    <div className='mt-10 space-y-10 '>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
