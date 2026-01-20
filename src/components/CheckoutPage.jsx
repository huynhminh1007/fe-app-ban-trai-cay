import "../styles/checkout.scss";
import Header from "./Header";
import Footer from "./Footer";
import { getCart } from "../fakeApi/cartApi";
import { formatVND } from "./utils/Format";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState("");
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    tinhId: "",
    tinhName: "",
    quanId: "",
    quanName: "",
    phone: "",
    email: "",
    note: "",
    shipMethod: "viettel",
  });

  /* ================= LOAD CART ================= */
  useEffect(() => {
    async function loadCart() {
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
        0,
      );

      setTotalPrice(total);
    }

    loadCart();
  }, []);

  /* ================= LOAD TỈNH ================= */
  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh-new/1/0.htm")
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setTinhList(data.data);
        }
      });
  }, []);

  /* ================= LOAD QUẬN THEO TỈNH ================= */
  useEffect(() => {
    if (!selectedTinh) return;

    fetch(`https://esgoo.net/api-tinhthanh-new/2/${selectedTinh}.htm`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setQuanList(data.data);
        }
      });
  }, [selectedTinh]);

  /* ================= SUBMIT ================= */
  const handleOrder = () => {
    navigate("/order-confirm", {
      state: { orderInfo, cart, totalPrice },
    });
  };

  return (
    <div className="checkout-page">
      {/* <Header /> */}

      <div className="checkout-container">
        {/* ========== LEFT ========== */}
        <div className="checkout-left">
          <h2>Chi tiết đơn hàng</h2>

          <div className="form-row">
            <label>
              Họ và tên <span>*</span>
            </label>
            <input
              type="text"
              value={orderInfo.name}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, name: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <label>
              Địa chỉ <span>*</span>
            </label>
            <input
              type="text"
              value={orderInfo.address}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, address: e.target.value })
              }
            />
          </div>

          <div className="form-row two-col">
            {/* ===== TỈNH ===== */}
            <div className="css_select_div">
              <select
                className="css_select"
                value={orderInfo.tinhId}
                onChange={(e) => {
                  const selected = tinhList.find(
                    (t) => t.id === e.target.value,
                  );

                  setSelectedTinh(e.target.value);
                  setQuanList([]);

                  setOrderInfo({
                    ...orderInfo,
                    tinhId: selected.id,
                    tinhName: selected.full_name,
                    quanId: "",
                    quanName: "",
                  });
                }}
              >
                <option value="">Tỉnh / Thành phố</option>
                {tinhList.map((tinh) => (
                  <option key={tinh.id} value={tinh.id}>
                    {tinh.full_name}
                  </option>
                ))}
              </select>
            </div>

            {/* ===== QUẬN ===== */}
            <div className="css_select_div">
              <select
                className="css_select"
                value={orderInfo.quanId}
                onChange={(e) => {
                  const selected = quanList.find(
                    (q) => q.id === e.target.value,
                  );

                  setOrderInfo({
                    ...orderInfo,
                    quanId: selected.id,
                    quanName: selected.full_name,
                  });
                }}
              >
                <option value="">Quận / Huyện</option>
                {quanList.map((quan) => (
                  <option key={quan.id} value={quan.id}>
                    {quan.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <label>
              Số điện thoại <span>*</span>
            </label>
            <input
              type="text"
              value={orderInfo.phone}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, phone: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <label>Email (tùy chọn)</label>
            <input
              type="email"
              value={orderInfo.email}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, email: e.target.value })
              }
            />
          </div>

          <h3>Thông tin bổ sung</h3>
          <div className="form-row">
            <label>Ghi chú</label>
            <textarea
              rows="4"
              value={orderInfo.note}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, note: e.target.value })
              }
            />
          </div>
        </div>

        {/* ========== RIGHT ========== */}
        <div className="checkout-right">
          <h3>Đơn hàng</h3>

          <div className="order-box">
            <div className="order-header">
              <span>Sản phẩm</span>
              <span>Tổng</span>
            </div>

            {cart?.items?.map((item) => (
              <div className="order-item" key={item.product.id}>
                <div className="order-product">
                  <img
                    src={item.product.images[0].src}
                    alt={item.product.name}
                  />
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                </div>
                <span>
                  {formatVND(item.product.prices.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="order-subtotal">
              <span>Tạm tính</span>
              <span>{formatVND(totalPrice)}</span>
            </div>

            <div className="order-total">
              <span>Tổng</span>
              <span>{formatVND(totalPrice)}</span>
            </div>
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="ship"
                checked={orderInfo.shipMethod === "bus"}
                onChange={() =>
                  setOrderInfo({ ...orderInfo, shipMethod: "bus" })
                }
              />
              Vận chuyển bằng xe khách
            </label>

            <label>
              <input
                type="radio"
                name="ship"
                checked={orderInfo.shipMethod === "viettel"}
                onChange={() =>
                  setOrderInfo({ ...orderInfo, shipMethod: "viettel" })
                }
              />
              Viettel Post
            </label>
          </div>

          <button className="btn-order" onClick={handleOrder}>
            Đặt hàng
          </button>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
