import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth/utils';

import { Product, Role } from '@prisma/client';
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      name,
      price,
      shortdesc,
      longdesc,
      image,
      bestSeller,
      newArrival,
      topRated,
    } = (await req.json()) as Product;
    const product = await db.product.create({
      data: {
        name,
        price,
        shortdesc,
        longdesc,
        image,
        bestSeller,
        newArrival,
        topRated,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
