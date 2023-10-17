'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import React from 'react';
import { UserColumn } from './column';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
interface CellActionProps {
  data: UserColumn;
}
export default function CellAction({ data }: CellActionProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${data.id}`);
      router.refresh();
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all users using this product.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-8 h-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${data.id}`)}
          >
            <Edit className='w-4 h-4 mr-2 ' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className='w-4 h-4 mr-2 ' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
