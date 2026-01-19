import logo from "./logo.svg";
import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import ProductListPage from "./components/ProductListPage";

import Register from "./Pages/authenticationPage/Register";
import ResetPass from "./Pages/authenticationPage/ResetPass";
import ConfirmPass from "./Pages/authenticationPage/ConfirmPass";
import OTPConfirm from "./Pages/authenticationPage/OTPConfirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/confirm-password" element={<ConfirmPass />} />
        <Route path="/otp-confirm" element={<OTPConfirm />} />

        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/products" element={<ProductListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;