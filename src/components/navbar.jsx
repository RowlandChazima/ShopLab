import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-slate-800 font-bold text-xl tracking-tight">
            {/* Minimalist Shopping/News Logo */}
            <svg className="w-6 h-6 text-[#FF6B9D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>Shop<span className="text-[#FF6B9D]">Hub</span></span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-slate-600 hover:text-[#FF6B9D] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/checkout" 
              className="text-sm font-medium text-slate-600 hover:text-[#FF6B9D] flex items-center gap-1 transition-colors"
            >
              <span>Cart</span>
              <span className="bg-rose-50 text-[#FF6B9D] text-[11px] px-1.5 py-0.5 rounded-full font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Auth Actions State */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/auth" 
                className="text-sm font-semibold text-slate-600 hover:text-[#FF6B9D] px-3 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/auth" 
                className="text-sm font-medium text-white bg-[#FF6B9D] hover:bg-[#e05688] px-4 py-2 rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500 hidden sm:inline">
                Hello, <span className="font-medium text-slate-700">{user.email}</span>
              </span>
              <button 
                className="text-sm font-medium text-slate-600 hover:text-red-500 border border-slate-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors bg-white shadow-sm"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}