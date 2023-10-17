import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser } from '@/lib/auth/utils';
import { Product } from '@prisma/client';

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== 'ADMIN') {
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    const product = await db.product.update({
      where: { id: params.productId },
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
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const products = await db.product.findUnique({
      where: { id: params.productId },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    if (!user || user.role !== 'ADMIN') {
      NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const product = await db.product.delete({
      where: { id: params.productId },
    });
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
