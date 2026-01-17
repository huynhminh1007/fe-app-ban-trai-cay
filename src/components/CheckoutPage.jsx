import "../styles/checkout.scss";
import Header from "./Header";
import Footer from "./Footer";
import {useState,useEffect} from "react";


export default function CheckoutPage() {

    const [showPopup, setShowPopup] = useState(false)
    const handleOrder = () => {setShowPopup(true);};
    const [tinhList, setTinhList] = useState([]);
    const [quanList, setQuanList] = useState([]);
    const [selectedTinh, setSelectedTinh] = useState("");

    useEffect(() => {
        fetch("https://esgoo.net/api-tinhthanh-new/1/0.htm")
            .then(res => res.json())
            .then(data => {
                if (data.error === 0) {
                    setTinhList(data.data);
                }
            });
    }, []);

    useEffect(() => {
        if (!selectedTinh) return;

        fetch(`https://esgoo.net/api-tinhthanh-new/2/${selectedTinh}.htm`)
            .then(res => res.json())
            .then(data => {
                if (data.error === 0) {
                    setQuanList(data.data);
                }
            });
    }, [selectedTinh]);

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
                        <input type="text"/>
                    </div>
                    <div className="css_select_div">
                        <select
                            className="css_select"
                            value={selectedTinh}
                            onChange={(e) => setSelectedTinh(e.target.value)}
                        >
                            <option value="">Tỉnh Thành</option>
                            {tinhList.map(tinh => (
                                <option key={tinh.id} value={tinh.id}>
                                    {tinh.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="css_select_div">
                        <select className="css_select">
                            <option value="">Phường Xã</option>
                            {quanList.map(quan => (
                                <option key={quan.id} value={quan.id}>
                                    {quan.full_name}
                                </option>
                            ))}
                        </select>
                        </div>


                    <div className="form-row">
                        <label>Số điện thoại <span>*</span></label>
                        <input type="text"/>
                    </div>

                    <div className="form-row">
                        <label>Email (tùy chọn)</label>
                        <input type="email"/>
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

                    <button className="btn-order" onClick={handleOrder}>Đặt hàng</button>
                </div>

                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            {/* Nút X đóng ở góc */}
                            <span className="close-btn" onClick={() => setShowPopup(false)}>X</span>

                            {/* 1. Tiêu đề đơn hàng thành công */}
                            <h2 className="success-title">Đơn hàng đã được đặt thành công</h2>

                            {/* 2. Hình ảnh chú gấu */}
                            <img
                                src={require("../res/imgs/order_success2.png")}
                                alt="Success"
                                className="popup-image"
                            />

                            {/* 3. Lời cảm ơn và thông báo giao hàng */}
                            <div className="success-message">
                                <p>Cảm ơn bạn đã đặt hàng</p>
                                <p>chúng tớ sẽ cố gắng giao sớm nhất có thể ạ</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className="page-with-footer">
                <Footer />
            </div>
        </div>
    );
}
