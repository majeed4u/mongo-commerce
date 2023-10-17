import NewProductForm from '@/components/admin-components/admin-product-components/new-product-form';
import { db } from '@/lib/db';
export default async function AdminNewPage() {
  const products = await db.product.findMany();
  return (
    <div>
      <NewProductForm />
    </div>
  );
}
