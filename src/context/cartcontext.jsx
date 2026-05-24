import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null)

export default function CartProvider ({children}) {
    const [cartItems, setCartItems] = useState([])

    // Adding items to the cart
    function addToCart(productId) {
    const existing = cartItems.find((item) => item.id === productId);
    if (existing) {
      const currentQuantity = existing.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

 function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductById(item.id),
      }))
      .filter((item) => item.product);
  }

// REMOVING ITEMS FROM SHOPPING CART
   function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }


    function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

}


// Total items in the cart
  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
    return total;
  }

//   Clear the whole cart
 function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}



// ==================
// RETURN STATEMENT FOR THE EXPORT
// ==================
export function useCart() {
    const context = useContext(CartContext)
    return context
}