import logo from "./logo.svg";
import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  return (
    // <>
    //   <Home />
    // </>

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />}/>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
