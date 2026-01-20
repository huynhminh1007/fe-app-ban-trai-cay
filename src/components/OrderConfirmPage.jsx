import "../styles/orderConfirm.scss";
import Header from "./Header";
import Footer from "./Footer";

import { useLocation, useNavigate } from "react-router-dom";
import { formatVND } from "./utils/Format";
import { useState } from "react";

export default function OrderConfirmPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const handleOrder = () => {
    setShowPopup(true);
  };

  if (!state) {
    navigate("/");
    return null;
  }

  const { orderInfo, cart, totalPrice } = state;

  return (
    <div className="order-confirm-page">
      {/* <Header /> */}

      <div className="confirm-container">
        <h2>Xác nhận đơn hàng</h2>

        {/* ===== THÔNG TIN KHÁCH HÀNG ===== */}
        <div className="confirm-box">
          <h3>Thông tin khách hàng</h3>
          <p>
            <b>Họ tên:</b> {orderInfo.name}
          </p>
          <p>
            <b>SĐT:</b> {orderInfo.phone}
          </p>
          <p>
            <b>Email:</b> {orderInfo.email || "Không có"}
          </p>
          <p>
            <b>Địa chỉ:</b> {orderInfo.address} – {orderInfo.quan} –{" "}
            {orderInfo.tinh}
          </p>
          <p>
            <b>Vận chuyển:</b>{" "}
            {orderInfo.shipMethod === "viettel" ? "Viettel Post" : "Xe khách"}
          </p>
          {orderInfo.note && (
            <p>
              <b>Ghi chú:</b> {orderInfo.note}
            </p>
          )}
        </div>

        {/* ===== DANH SÁCH SẢN PHẨM ===== */}
        <div className="confirm-box">
          <h3>Sản phẩm</h3>

          {cart.items.map((item) => {
            const { product, quantity } = item;
            return (
              <div className="confirm-item" key={product.id}>
                <img src={product.images[0].src} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>Số lượng: {quantity}</p>
                </div>
                <span>{formatVND(product.prices.price * quantity)}</span>
              </div>
            );
          })}

          <div className="confirm-total">
            <span>Tổng thanh toán</span>
            <span>{formatVND(totalPrice)}</span>
          </div>
        </div>

        {/* ===== ACTION ===== */}
        <div className="confirm-action">
          <button className="btn-back" onClick={() => navigate(-1)}>
            Quay lại chỉnh sửa{" "}
          </button>

          <button className="btn-confirm" onClick={handleOrder}>
            Xác nhận đặt hàng{" "}
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              {/* Nút X đóng ở góc */}
              <span className="close-btn" onClick={() => setShowPopup(false)}>
                X
              </span>

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
              <div>
                <button className="back_home" onClick={() => navigate("/")}>
                  Quay về trang chủ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
