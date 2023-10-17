export async function getProduct(id: string) {
  const response = await fetch(`/api/products/${id}`);
  const products = await response.json();
  return products;
}
