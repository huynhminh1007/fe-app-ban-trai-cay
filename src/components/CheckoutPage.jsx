import "../styles/checkout.scss";
import Header from "./Header";
import Footer from "./Footer";
import { getCart } from "../fakeApi/cartApi";
import { formatVND } from "./utils/Format";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate("/order-confirm", { state: { orderInfo, cart, totalPrice } });
  };
  const [showPopup, setShowPopup] = useState(false);
  //const handleOrder = () => {setShowPopup(true);};
  const [tinhList, setTinhList] = useState([]);
  const [quanList, setQuanList] = useState([]);
  const [selectedTinh, setSelectedTinh] = useState("");
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    address: "",
    tinh: "",
    quan: "",
    phone: "",
    email: "",
    note: "",
    shipMethod: "viettel",
  });

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

  useEffect(() => {
    fetch("https://esgoo.net/api-tinhthanh-new/1/0.htm")
      .then((res) => res.json())
      .then((data) => {
        if (data.error === 0) {
          setTinhList(data.data);
        }
      });
  }, []);

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

  return (
    <div className="checkout-page">
      <div className="page-with-header">{/* <Header /> */}</div>
      <div className="checkout-container">
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
            <div className="css_select_div">
              <select
                className="css_select"
                value={orderInfo.tinh}
                onChange={(e) => {
                  setSelectedTinh(e.target.value); // dùng để fetch quận
                  setOrderInfo({
                    ...orderInfo,
                    tinh: e.target.options[e.target.selectedIndex].text,
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
            <div className="css_select_div">
              <select
                className="css_select"
                value={orderInfo.quan}
                onChange={(e) =>
                  setOrderInfo({
                    ...orderInfo,
                    quan: e.target.options[e.target.selectedIndex].text,
                  })
                }
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
            <label>Ghi chú đơn hàng (tùy chọn)</label>
            <textarea
              rows="4"
              value={orderInfo.note}
              onChange={(e) =>
                setOrderInfo({ ...orderInfo, note: e.target.value })
              }
            />
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

            {cart?.items?.map((item) => {
              const { product, quantity } = item;
              return (
                <div className="order-item" key={product.id}>
                  <div className="order-product">
                    <img src={product.images[0].src} alt={product.name} />
                    <span>
                      {product.name} × {quantity}
                    </span>
                  </div>
                  <span>{formatVND(product.prices.price * quantity)}</span>
                </div>
              );
            })}

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
              Vận chuyển qua Viettel Post
            </label>
          </div>

          <button className="btn-order" onClick={handleOrder}>
            Đặt hàng
          </button>
        </div>
      </div>
      {/* <div className="page-with-footer">
        <Footer />
      </div> */}
    </div>
  );
}
