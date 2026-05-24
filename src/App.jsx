import { Route, Routes } from "react-router-dom"

import Home from "./pages/home"
import Auth from "./pages/auth"
import Checkout from "./pages/checkout"
import Navbar from "./components/navbar"


import "./index.css"
import AuthProvider from "./context/authcontext"
import ProductDetails from "./pages/productDetails"
import CartProvider from "./context/cartcontext"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}



export default App