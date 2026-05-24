import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
  const products = getProducts();
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-[#ffebf1] border-b border-rose-100/50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle decorative background blur elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-5 right-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6">
            Welcome to <span className="text-[#FF6B9D]">ShopHub</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover amazing products at great prices, tailored exactly to your lifestyle.
          </p>
        </div>
      </div>

      {/* Products Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-5 mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Our Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Showing our top-rated collections available today
            </p>
          </div>
          
          {/* Optional decorative indicator matching the look */}
          <div className="text-xs font-semibold text-[#FF6B9D] bg-rose-50 px-3 py-1.5 rounded-full">
            ✨ Featured
          </div>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}