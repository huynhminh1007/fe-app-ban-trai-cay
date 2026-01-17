import React from 'react';
import '../../styles/ProductDetail_Style/ProductSimilar.css';
import { FiShoppingCart } from 'react-icons/fi';

function ProductSimilar() {
    const products = [
        { id: 1, name: "Cây Giống Mít Ruột Đỏ", price: "45.000₫", img: "https://sieuthihatgiong.vn/wp-content/uploads/2023/02/M%C3%ADt%20ru%E1%BB%99t%20%C4%91%E1%BB%8F%20Malaysiamuacaygiongmitruotdomalaysia0.jpg" },
        { id: 2, name: "Cây Giống Bưởi Da Xanh", price: "59.000₫", img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/482/702/products/2-jpeg-d01ab46c-0750-40a6-9d41-a74315de266c.jpg?v=1690689606717" },
        { id: 3, name: "Cây Giống Ổi Ruby", price: "35.000₫", img: "https://sieuthihatgiong.vn/wp-content/uploads/2023/02/C%C3%A2y%20%E1%BB%95i%20ruby%20ru%E1%BB%99t%20%C4%91%E1%BB%8Fcayoirubyruotdo0.JPG" },
        { id: 4, name: "Cây Giống Vú Sữa Hoàng Kim", price: "80.000₫", img: "https://cayxanhmienbac.vn/wp-content/uploads/2024/06/vu-sua-hoang-kim.jpg?v=1719547985" },
    ];

    return (
        <div className="similar-wrapper">
            <h2 className="section-title">SẢN PHẨM LIÊN QUAN</h2>
            
            <div className="similar-grid">
                {products.map((item) => (
                    <div key={item.id} className="product-card">

                        <div className="card-img">
                            <img src={item.img} alt={item.name} />

                            <div className="card-item">
                                <button title="Thêm vào giỏ"><FiShoppingCart /></button>
                            </div>
                        </div>

                        <div className="card-info">
                            <h3 className="card-name"><a href="#">{item.name}</a></h3>
                            <p className="card-price">{item.price}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSimilar;