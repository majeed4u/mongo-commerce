'use client';

import { productSchema } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import * as z from 'zod';
import CellAction from './cell-actions';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  shortdesc: string;
  newArrival: boolean;
  bestSeller: boolean;
  topRated: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'shortdesc',
    header: 'Short Description',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },

  {
    accessorKey: 'newArrival',
    header: 'New Arrival',
  },
  {
    accessorKey: 'bestSeller',
    header: 'Best Seller',
  },
  {
    accessorKey: 'topRated',
    header: 'Top Rated',
  },
  {
    accessorKey: 'createAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell({ row }) {
      return <CellAction data={row.original} />;
    },
  },
];
