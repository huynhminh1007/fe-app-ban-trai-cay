import { useState } from "react";
import "../styles/cartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import product1 from "../res/imgs/product_1.jpg";

const MOCK_CART = [
    {
        id: 1,
        name: "Sầu Riêng Black Thorn D200 Gốc tiêu chuẩn",
        price: 165000,
        quantity: 1,
        image: product1,
    },
    {
        id: 2,
        name: "Cây Giống Sầu Riêng Thái Monthong gốc tiêu chuẩn (1p5-1p7)",
        price: 119000,
        quantity: 1,
        image: product1,
    },
];

const CartPage = () => {
    const [cart, setCart] = useState(MOCK_CART);

    const formatPrice = (value) =>
        value.toLocaleString("vi-VN") + "đ";

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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

                        {cart.map((item) => (
                            <div className="cart-row" key={item.id}>
                                <div className="product-info">
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ✕
                                    </button>
                                    <img src={item.image} alt={item.name} />
                                    <a href=" ">{item.name}</a>
                                </div>

                                <div className="price">
                                    {formatPrice(item.price)}
                                </div>

                                <div className="quantity">
                                    <button onClick={() => decreaseQty(item.id)}>
                                        −
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQty(item.id)}>
                                        +
                                    </button>
                                </div>

                                <div className="subtotal">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}

                        <div className="cart-actions">
                            <button className="btn btn-green">
                                Tiếp tục mua hàng
                            </button>
                            <button className="btn">
                                Cập nhật giỏ hàng
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: SUMMARY */}
                    <div className="cart-summary">
                        <h3>Tổng giỏ hàng</h3>

                        <div className="summary-row">
                            <span>Tạm tính</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>

                        <div className="summary-row total">
                            <span>Tổng đơn hàng</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>

                        <button className="checkout" >
                            Thanh toán
                        </button>
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
