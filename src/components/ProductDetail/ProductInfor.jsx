import React, {useState} from 'react';
import '../../styles/ProductDetail_Style/ProductInfor.css';
import { FiShoppingBag } from "react-icons/fi";

const ProductInfo = ({ product }) => {

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


    // kiểm tra stock trong product để hiển thị tình trạng
    const stockCount = product?.stock || 0; 
    const isOutOfStock = stockCount <= 0;

    return (
        <div className="product-info-wrapper">
            <h1 className="p-title">{product.name}</h1>
            
            <div className="p-price">{product.prices.price}đ</div>

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
                    {isOutOfStock ? (
                        <span style={{color: 'red', fontWeight: 'bold'}}>Hết hàng</span>
                    ) : (
                        <span style={{color: '#21c42a', fontWeight: 'bold'}}>Còn hàng : {stockCount}</span>
                    )}
                </p>
                
                <p className="meta-row">
                    <strong>Danh mục: </strong> 
                    {product.categories?.map((cat, index) => (
                        <span key={cat.id || index}>
                            <a href={'#'}>{cat.name}</a>
                        </span>
                    ))}
                </p>
                
                <p className="meta-row tags">
                    <strong>Từ khóa: </strong>
                    {product.tags.map((tag, index) => (
                            <span key={tag.id || index}>
                                <a href={'#'}>{tag.name}</a>
                                {index < product.tags.length - 1 ? ", " : ""}
                            </span>
                        ))}
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