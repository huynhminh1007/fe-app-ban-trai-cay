import logo from "./logo.svg";
import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import CartPage from "./components/CartPage";
import ProductDetail from "./components/products/ProductDetail";
import ProductDetailPage from "./Pages/ProductDetailPage";

function App() {
  return (
    // <>
    //   <ProductDetailPage />
    // </>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
