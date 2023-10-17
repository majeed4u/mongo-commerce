export async function getProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  return products;
}
