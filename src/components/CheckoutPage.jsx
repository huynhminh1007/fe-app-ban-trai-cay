import "../styles/checkout.scss";
import Header from "./Header";
import Footer from "./Footer";

export default function CheckoutPage() {
    return (

        <div className="checkout-page">
            <div className="page-with-header">
                <Header />
            </div>
            <div className="checkout-container">

                {/* ===== LEFT: FORM ===== */}
                <div className="checkout-left">
                    <h2>Chi tiết đơn hàng</h2>

                    <div className="form-row two-col">
                        <div>
                            <label>Tên <span>*</span></label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>Họ (tùy chọn)</label>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="form-row">
                        <label>Địa chỉ <span>*</span></label>
                        <input type="text" />
                    </div>

                    <div className="form-row">
                        <label>Tỉnh / Thành phố <span>*</span></label>
                        <input type="text" />
                    </div>

                    <div className="form-row">
                        <label>Số điện thoại <span>*</span></label>
                        <input type="text" />
                    </div>

                    <div className="form-row">
                        <label>Email (tùy chọn)</label>
                        <input type="email" />
                    </div>

                    <h3>Thông tin bổ sung</h3>
                    <div className="form-row">
                        <label>Ghi chú đơn hàng (tùy chọn)</label>
                        <textarea rows="4"></textarea>
                    </div>
                </div>

                {/* ===== RIGHT: ORDER ===== */}
                <div className="checkout-right">
                    <h3>Đơn hàng</h3>

                    <div className="order-box">
                        <div className="order-header">
                            <span>Sản phẩm</span>
                            <span>Tổng</span>
                        </div>

                        <div className="order-item">
                            <span>Sầu Riêng Black Thorn D200 × 1</span>
                            <span>165.000đ</span>
                        </div>

                        <div className="order-item">
                            <span>Cây giống sầu riêng Monthong × 1</span>
                            <span>119.000đ</span>
                        </div>

                        <div className="order-subtotal">
                            <span>Tạm tính</span>
                            <span>284.000đ</span>
                        </div>

                        <div className="order-total">
                            <span>Tổng</span>
                            <span>284.000đ</span>
                        </div>
                    </div>

                    <div className="payment-method">
                        <label>
                            <input type="radio" name="ship" />
                            Vận chuyển bằng xe khách
                        </label>

                        <label>
                            <input type="radio" name="ship" defaultChecked />
                            Vận chuyển qua Viettel Post
                        </label>
                    </div>

                    <button className="btn-order">Đặt hàng</button>
                </div>

            </div>
            <div className="page-with-footer">
                <Footer />
            </div>
        </div>
    );
}
