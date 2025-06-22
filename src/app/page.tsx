import ProductList from "./components/ProductList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <header className="w-full px-4 sm:px-6 lg:px-8 py-6 border-b bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">MyStore</h1>
          <nav className="text-sm space-x-6">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#" className="hover:text-blue-600 transition">Categories</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <ProductList />
      </section>

      <footer className="bg-white border-t text-center text-sm py-6 text-gray-500">
        <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      </footer>
    </main>
  );
}