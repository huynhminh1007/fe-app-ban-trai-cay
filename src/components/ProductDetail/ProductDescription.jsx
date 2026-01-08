import React, { useState } from 'react';
import '../../styles/ProductDetail_Style/ProductDescription.css';
import Emojis from './Emoji';
import { FiStar, FiUser, FiSend } from "react-icons/fi";

function ProductDescription({ data }) {
    const [activeTab, setActiveTab] = useState('description');

    // mảng danh sách feedback 
    const [reviews, setReviews] = useState([
        { id: 1, name: "Nguyễn Văn A", rating: 5, comment: "Cây rất khỏe, đóng gói cẩn thận. Shop tư vấn nhiệt tình.", date: "10/10/2023" },
        { id: 2, name: "Trần Thị B", rating: 4, comment: "Giao hàng hơi chậm chút nhưng cây vẫn tươi. Sẽ ủng hộ lần sau.", date: "12/10/2023" }
    ]);

    const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

    const handleSubmitReview = (e) => {
        e.preventDefault(); // không load lại trang khi có feedback mới

        // Kiểm tra đã nhập tên or nhập comment chưa
        if (!newReview.name || !newReview.comment) {
            alert("Vui lòng nhập tên và nội dung đánh giá!");
            return;
        }

        // Tạo object mới từ dữ liệu nhập
        const newItem = {
            id: Date.now(),
            name: newReview.name,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toLocaleDateString('vi-VN')
        };

        // Cập nhật danh sách 
        setReviews([newItem, ...reviews]);

        // load lại form
        setNewReview({ name: '', comment: '', rating: 5 });
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, index) => (
            <FiStar
                key={index}
                size={14}
                className={index < count ? "star-icon filled" : "star-icon"}
            />
        ));
    };

    const [showEmoji, setShowEmoji] = useState(false);
    // hàm thêm emoji vào comment
    const EmojiSelect = (emoji) => {
        setNewReview({ ...newReview, comment: newReview.comment + emoji.emoji });
    }

    // Nếu chưa có data => không hiển thị gì 
    if (!data) return null;

    return (
        <div className="description-container">
            {/* Tab chuyển đổi giữa description và review */}
            <div className="desc-tabs">
                <button
                    className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Chi tiết sản phẩm
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Đánh giá
                </button>
            </div>

            {/* Description */}
            <div className="tab-content">
                {activeTab === 'description' ? (
                    <div className="content-text">

                        <h1 className="desc-h1">{data.name}</h1>

                        <div className="desc-section">
                            <h2 className="desc-h2">1. Đặc điểm nổi bật</h2>
                            <p>{data.description}</p>
                        </div>

                        <div className="desc-section">
                            <h2 className="desc-h2">2. Kỹ thuật trồng cây</h2>

                            <div className="desc-item">
                                <p><strong>a) Thời vụ:</strong> {data.plantingTechnique.season}</p>
                                <div className='desc-img'>
                                    <img src={data.plantingTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>b) Lượng nước:</strong> {data.plantingTechnique.water}</p>
                                <div className='desc-img'>
                                    <img src={data.plantingTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>c) Đất trồng:</strong> {data.plantingTechnique.soil}</p>
                                <div className='desc-img'>
                                    <img src={data.plantingTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>d) Tiêu chuẩn cây giống:</strong> {data.plantingTechnique.seedling}</p>
                                <div className='desc-img'>
                                    <img src={data.plantingTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>e) Khoảng cách trồng:</strong> {data.plantingTechnique.spacing}</p>
                            </div>
                        </div>

                        <div className="desc-section">
                            <h2 className="desc-h2">3. Kỹ thuật chăm sóc</h2>

                            <div className="desc-item">
                                <p><strong>a) Bón phân:</strong> {data.careTechnique.fertilizer}</p>
                                <div className='desc-img'>
                                    <img src={data.careTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>b) Tưới nước:</strong> {data.careTechnique.watering}</p>
                                <div className='desc-img'>
                                    <img src={data.careTechnique.img1} alt="img" />
                                </div>
                            </div>
                            <div className="desc-item">
                                <p><strong>c) Phòng trừ sâu bệnh:</strong> {data.careTechnique.pestControl}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Reviews
                    <div className="reviews-board">
                        <div className="review-input-box">
                            <h3>Viết đánh giá của bạn</h3>
                            <form onSubmit={handleSubmitReview}>

                                {/* Đánh giá star */}
                                <div className="rating-select">
                                    <span>Chọn mức độ: </span>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FiStar
                                            key={star}
                                            size={20}
                                            className={star <= newReview.rating ? "star-select filled" : "star-select"}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                        />
                                    ))}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Tên của bạn..."
                                    className="input-name"
                                    value={newReview.name} //Tạo biến value = tên người dùng nhập vào
                                    /*
                                        "...newReview": gọi là Spread Operator
                                        => hiểu đơn giản: Copy toàn bộ những gì đang có trong cái giỏ cũ (rating, comment) sang cái giỏ mới (newReview)

                                        "name: e.target.value" => cập nhật only phần "name" khi người dùng nhập vào
                                        vd:
                                            State cũ: { name: "", rating: 5, comment: "Tốt" }

                                             õ chữ "A" vào ô name.

                                            => setNewReview({ ...copy_cũ, name: "A" })

                                            State mới: { name: "A", rating: 5, comment: "Tốt" }
                                    */
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                />
                                <div className="input-group">
                                    <textarea
                                        placeholder="Chia sẻ cảm nhận về sản phẩm..."
                                        className="input-comment"
                                        rows="2"
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    ></textarea>

                                    {/* Emojis */}
                                    <button
                                        type="button"
                                        className="btn-emoji"
                                        onClick={() => setShowEmoji(!showEmoji)} // gióng như công tắc bật/tắt (để khỏi cần phải tạo thêm nút tắt) emoji khi click vào icon tượng trưng
                                    >
                                        <FiSmile size={24} />
                                    </button>

                                    <button type="submit" className="btn-send"><FiSend /></button>
                                    {/* Chỉ show component Emojis khi showEmoji = true*/}
                                    {showEmoji && <Emojis onSelect={EmojiSelect} />}
                                </div>
                            </form>
                        </div>

                        <div className="review-list">
                            {reviews.length === 0 ? (
                                <p className="no-review">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
                            ) : (
                                reviews.map((item) => (
                                    <div key={item.id} className="review-item">
                                        <div className="review-avatar">
                                            <div className="avatar-placeholder"><FiUser /></div>
                                        </div>

                                        <div className="review-content">

                                            <div className="review-header">
                                                <span className="review-name">{item.name}</span>
                                                <span className="review-date">{item.date}</span>
                                            </div>

                                            <div className="review-rating">
                                                {renderStars(item.rating)}
                                            </div>
                                            <p className="review-comment">{item.comment}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDescription;

