import logo from "./logo.svg";
import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import PostDetail from "./Pages/PostDetail";
import ProductListPage from "./components/ProductListPage";
import PostListPage from "./components/PostListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/posts" element={<PostListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
