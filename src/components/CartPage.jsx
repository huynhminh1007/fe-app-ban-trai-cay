import { useEffect, useState } from "react";
import "../styles/cartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatVND } from "./utils/Format";
import { updateQuantity, getCart } from "../fakeApi/cartApi";
import React from 'react';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
  const [cart, setCart] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const navigate = useNavigate();

  async function reloadCart() {
    const res = await getCart("1", [
      "id",
      "name",
      "prices",
      "images",
      "on_sale",
    ]);
    setCart(res);

    const total = res.items.reduce(
      (sum, i) => sum + Number(i.product.prices.price) * i.quantity,
      0
    );
    setTotalPrice(total);

    console.log(res);
  }

  useEffect(() => {
    reloadCart();
  }, []);

  const increaseQty = async (id) => {
    await updateQuantity(1, id, 1);
    reloadCart();
  };

  const decreaseQty = async (id) => {
    await updateQuantity(1, id, -1);
    reloadCart();
  };

  const removeItem = async (id) => {
    await updateQuantity(1, id, -9999);
    reloadCart();
  };

  return (
    <div className="cart-page">
      <div className="page-with-header">
        <Header />
      </div>
      <div className="container">
        <h2 className="cart-title">Giỏ hàng</h2>

        <div className="cart-content">
          {/* LEFT: CART TABLE */}
          <div className="cart-table">
            <div className="cart-header">
              <span>Sản phẩm</span>
              <span>Đơn giá</span>
              <span>Số lượng</span>
              <span>Tạm tính</span>
            </div>

            {cart?.items?.map((item) => {
              const { product, quantity } = item;
              const prices = product.prices;
              const thumbnail = product.images[0].src;

              return (
                <div className="cart-row" key={product.id}>
                  <div className="product-info">
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(product.id)}
                    >
                      ✕
                    </button>
                    <img src={thumbnail} alt={product.name} />
                    <a href=" ">{product.name}</a>
                  </div>

                  <div className="price">
                    <span className="sale-price">
                      {formatVND(prices.price)}
                    </span>

                    {product.on_sale && (
                      <span className="regular-price">
                        {formatVND(prices.regular_price)}
                      </span>
                    )}
                  </div>

                  <div className="quantity">
                    <button onClick={() => decreaseQty(product.id)}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => increaseQty(product.id)}>+</button>
                  </div>

                  <div className="subtotal">
                    {formatVND(prices.price * item.quantity)}
                  </div>
                </div>
              );
            })}

            <div className="cart-actions">
              <button className="btn btn-green">Tiếp tục mua hàng</button>
              <button className="btn">Cập nhật giỏ hàng</button>
            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="cart-summary">
            <h3>Tổng giỏ hàng</h3>

            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{formatVND(totalPrice)}</span>
            </div>

            <div className="summary-row total">
              <span>Tổng đơn hàng</span>
              <span>{formatVND(totalPrice)}</span>
            </div>
            <button className="checkout" onClick={() => navigate("/checkout")}>Thanh toán </button>
          </div>
        </div>
      </div>
      <div className="page-with-header">
        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
