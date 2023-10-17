import UpdateProductForm from '@/components/admin-components/admin-product-components/update-product-form';
import { db } from '@/lib/db';

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  });

  return (
    <div>
      <UpdateProductForm product={product} />
    </div>
  );
}
