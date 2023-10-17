import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth/utils';

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const admin = await currentUser();
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { role } = await req.json();
    const user = await db.user.update({
      where: { id: params.userId },
      data: { role },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
