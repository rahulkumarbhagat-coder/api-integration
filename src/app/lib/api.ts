export async function fetchProducts(limit = 10, skip = 0) {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const response = await res.json();
  return response
}

export async function fetchProductsByCategory(limit = 10, skip = 0, category:string) {
  const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`);
  const response = await res.json();
  return response
}

export async function fetchProductById(id: number) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) return null;
  const response = await res.json();
  return response
}

export async function fetchCategories() {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  const response = await res.json();
  return response
}