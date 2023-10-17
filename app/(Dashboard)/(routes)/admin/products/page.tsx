import Link from 'next/link';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import {
  ProductColumn,
  columns,
} from '@/components/admin-components/admin-product-components/column';
import { DataTable } from '@/components/data-table';
import { formatter } from '@/lib/utils';

export default async function ProductsPage() {
  const products = await db.product.findMany({
    orderBy: {
      id: 'desc',
    },
  });
  const formattedData: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: formatter.format(product.price),
    shortdesc: product.shortdesc,
    newArrival: product.newArrival,
    bestSeller: product.bestSeller,
    topRated: product.topRated,
    createdAt: format(new Date(product.createdAt), 'MMM do,yyyy'),
  }));

  return (
    <div className='mt-10 space-y-10 '>
      <div className='flex justify-end '>
        <Link
          href='/admin/products/new'
          className='p-3 text-white uppercase transition-colors rounded-sm bg-neutral-900 hover:bg-neutral-800'
        >
          Add new
        </Link>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
