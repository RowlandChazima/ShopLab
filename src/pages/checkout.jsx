import { useCart } from "../context/cartcontext";

export default function Checkout() {
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();
  const cartItems = getCartItemsWithProducts();
  const total = getCartTotal();

  function placeOrder() {
    alert("Successful Order!");
    clearCart();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Checkout</h1>
        
        {cartItems.length === 0 ? (
          /* Empty State Dashboard Window */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-50 text-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              🛒
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">Your cart is empty</h2>
            <p className="text-sm text-slate-400 mb-6">Looks like you haven't added any products to your order yet.</p>
          </div>
        ) : (
          /* Two-Column Grid Setup */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Hand Column: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-slate-700 mb-2">Order Summary</h2>
              
              {cartItems.map((item) => (
                <div 
                  className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 transition-all hover:shadow-md" 
                  key={item.id}
                >
                  {/* Aspect-ratio restricted image container */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                  />
                  
                  {/* Item Description */}
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{item.product.name}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">${item.product.price.toFixed(2)} each</p>
                  </div>
                  
                  {/* Product Controls Alignment Wrapper */}
                  <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    
                    {/* Modern Counter Box */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden h-9">
                      <button
                        className="px-3 h-full hover:bg-slate-200 active:bg-slate-300 text-slate-500 font-medium transition-colors text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        —
                      </button>
                      <span className="px-3 font-semibold text-sm text-slate-800 min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 h-full hover:bg-slate-200 active:bg-slate-300 text-slate-500 font-medium transition-colors text-sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        ＋
                      </button>
                    </div>

                    {/* Net Total Output line */}
                    <div className="text-right min-w-[4.5rem]">
                      <p className="font-bold text-slate-900 text-base">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Minimalist Trash Action */}
                    <button
                      className="text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50/50 px-2.5 py-1.5 rounded-md transition-all border border-transparent hover:border-red-100"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Hand Column: Sticky Invoice Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100">
                Payment Details
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                
                <hr className="border-slate-100 my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-[#FF6B9D]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="w-full py-3.5 bg-[#FF6B9D] text-white font-semibold rounded-xl text-sm shadow-md hover:bg-[#e05688] hover:shadow-lg active:scale-[0.99] transition-all"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}