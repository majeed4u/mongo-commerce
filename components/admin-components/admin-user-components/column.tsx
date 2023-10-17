'use client';

import { productSchema } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';
import CellAction from './cell-actions';
import { Role } from '@prisma/client';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserColumn = {
  id: string;
  name: string | null;
  email: string | null;
  role: Role | null;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },

  {
    id: 'actions',
    cell({ row }) {
      return <CellAction data={row.original} />;
    },
  },
];
