import logo from "./logo.svg";
import "./styles/main.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage";

function App() {
  return (
    // <>
    //   <Home />
    // </>

      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Gio_hang" element={<CartPage />} />
          </Routes>
      </BrowserRouter>

  );
}

export default App;
