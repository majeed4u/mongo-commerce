import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Role } from '@prisma/client';
export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect('/api/auth/signin');
};

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  return user;
};

export const isAdmin = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect('/');
  const user = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  if (!user) return null;
  return user?.role === Role.ADMIN;
};
