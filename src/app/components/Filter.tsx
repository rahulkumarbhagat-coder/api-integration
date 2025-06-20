export const fetchCategories = async () => {
  const res = await fetch(`https://dummyjson.com/products/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};
