'use client';

import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileMenu } from '../profile-menu';
import { LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
interface AdminNavProps {
  user: User | null;
}

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const router = [
    {
      name: 'Dashboard',
      path: '/admin',
      active: pathname === '/admin',
    },
    {
      name: 'Products',
      path: '/admin/products',
      active: pathname === '/admin/products',
    },
    {
      name: 'Users',
      path: '/admin/users',
      active: pathname === '/admin/users',
    },
  ];
  return (
    <div className='h-16 '>
      <div className='flex items-center justify-between py-3'>
        <div className='flex items-center justify-between space-x-8 '>
          <Link href='/' className='text-2xl font-bold '>
            MJSTORE
          </Link>
          <div className='flex items-center gap-4 '>
            {router.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={cn(
                  item.active
                    ? ' text-neutral-800 font-semibold'
                    : ' text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          {!user ? (
            <Link href='/login' className='flex items-center '>
              <LogIn />
              Login
            </Link>
          ) : (
            <ProfileMenu user={user} />
          )}
        </div>
      </div>
    </div>
  );
}
