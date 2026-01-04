import React, {useState} from 'react';
import '../../styles/ProductDetail_Style/ProductInfor.css';
import { FiShoppingBag } from "react-icons/fi";

const ProductInfo = () => {

    const [quantity, setQuantity] = useState(1);

    const handleMinus = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlus = () => {
        setQuantity(quantity + 1);
    }

    // Xử lý khi người dùng nhập số lượng trực tiếp
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    return (
        <div className="product-info-wrapper">
            <h1 className="p-title">Cây Giống Sầu riêng Musang King D197 gốc tiêu chuẩn</h1>
            
            <div className="p-price">99.000₫</div>

            <div className="specs-table-container">
                <table className="specs-table">
                    <tbody>
                        <tr>
                            <td>Chiều cao cây</td>
                            <td>80cm</td>
                        </tr>
                        <tr>
                            <td>Đường kính thân cây</td>
                            <td>17 – 20mm</td>
                        </tr>
                        <tr>
                            <td>Phương pháp nhân giống</td>
                            <td>Ghép</td>
                        </tr>
                        <tr>
                            <td>Thời gian cho trái</td>
                            <td>4 – 5 năm</td>
                        </tr>
                        <tr>
                            <td>Tuổi đời cây</td>
                            <td>Trên 30 năm</td>
                        </tr>
                        <tr>
                            <td>Năng suất bình quân</td>
                            <td>150 trái/cây</td>
                        </tr>
                        <tr>
                            <td>Tình trạng cây giống</td>
                            <td>Thân, cành thẳng và vững chắc</td>
                        </tr>
                        <tr>
                            <td>Đất trồng</td>
                            <td>Thích nghi trên nhiều loại đất có độ PH từ 5.5 – 6.5, độ mặn &lt;0.3 phần ngàn</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="product-meta-data">
                <p className="meta-row">
                    <strong>Tình trạng: </strong> 
                    <span style={{color: 'red', fontWeight: 'bold'}}>Hết hàng</span> 
                    {/* <span style={{color: '2e7d32', fontWeight: 'bold'}}>Hết hàng</span>  */}
                </p>
                
                <p className="meta-row">
                    <strong>Danh mục: </strong> 
                    <a href="#">Cây ăn trái</a>, <a href="#">Cây giống Sầu Riêng</a>, <a href="#">Sản phẩm bán chạy</a>, <a href="#">Sầu riêng Musang King</a>
                </p>
                
                <p className="meta-row tags">
                    <strong>Từ khóa: </strong>
                    <a href="#">cây giống sầu riêng musang king</a>, <a href="#">có nên trồng sầu riêng musang king</a>, 
                    <a href="#">giá cây giống sầu riêng musang king</a>, <a href="#">giống cây trồng</a>, <a href="#">sầu riêng musang king d197</a>
                </p>
            </div>

            <div className="purchase-actions">
                {/* tùy chỉnh số lượng */}
                <div className="qty-control-group">
                    <button className="qty-btn" onClick={handleMinus}>-</button>
                    <input 
                        type="number" 
                        className="qty-input" 
                        value={quantity} 
                        onChange={handleInputChange}
                    />
                    <button className="qty-btn" onClick={handlePlus}>+</button>
                </div>

                {/* nút giỏ hàng */}
                <button className="add-to-cart-btn-large">
                    <FiShoppingBag size={20} style={{ marginBottom: '-2px' }} /> 
                    <span>THÊM VÀO GIỎ HÀNG</span>
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;