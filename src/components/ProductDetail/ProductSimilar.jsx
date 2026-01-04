import React from 'react';
import '../../styles/ProductDetail_Style/ProductSimilar.css';
import { FiShoppingCart } from 'react-icons/fi';

function ProductSimilar() {
    const products = [
        { id: 1, name: "Cây Giống Mít Ruột Đỏ", price: "45.000₫", img: "https://thegioicaygiong.com/wp-content/uploads/2022/03/mit-ruot-do-so-vang-malaysia-400x400.jpg" },
        { id: 2, name: "Cây Giống Bưởi Da Xanh", price: "59.000₫", img: "https://thegioicaygiong.com/wp-content/uploads/2019/07/buoi-da-xanh.chiet-nho-400x400.jpg" },
        { id: 3, name: "Cây Giống Ổi Ruby", price: "35.000₫", img: "https://thegioicaygiong.com/wp-content/uploads/2019/12/oi-ruby-400x400.jpg" },
        { id: 4, name: "Cây Giống Vú Sữa Hoàng Kim", price: "80.000₫", img: "https://thegioicaygiong.com/wp-content/uploads/2020/07/vu-sua-hoang-kim-400x400.jpg" },
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