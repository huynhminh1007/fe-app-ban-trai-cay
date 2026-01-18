import React, { useState } from "react";
import "../../styles/ProductDetail_Style/ProductDescription.css";
import Emojis from "./Emoji";
import { FiStar, FiUser, FiSend, FiSmile } from "react-icons/fi";

function ProductDescription({ data }) {
  const [activeTab, setActiveTab] = useState("description");

  // mảng danh sách feedback
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      rating: 5,
      comment: "Cây rất khỏe, đóng gói cẩn thận. Shop tư vấn nhiệt tình.",
      date: "10/10/2023",
    },
    {
      id: 2,
      name: "Trần Thị B",
      rating: 4,
      comment: "Giao hàng hơi chậm chút nhưng cây vẫn tươi. Sẽ ủng hộ lần sau.",
      date: "12/10/2023",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 5,
  });

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
      date: new Date().toLocaleDateString("vi-VN"),
    };

    // Cập nhật danh sách
    setReviews([newItem, ...reviews]);

    // load lại form
    setNewReview({ name: "", comment: "", rating: 5 });
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
  };

  // Nếu chưa có data => không hiển thị gì
  if (!data) return null;
  const description =
    '<h2><strong><span style="color: #008000">ĐẶC TÍNH GIỐNG BƠ BOOTH 7</span></strong></h2>\n<p><strong>Giống Bơ Booth 7</strong> có phần vỏ quả của bơ booth có màu xanh, quả thường có hình tròn, cuống quả dài. Vỏ quả dài, kích thước mỗi quả thường đạt khoảng 350g/quả. Mỗi quả bơ booth 7 đều có gắn với một cuốn quả riêng, đây là một trong những điểm giúp bơ booth 7 <strong>dễ dàng thu hoạch và bảo quản</strong> hơn. Thích hợp xuất khẩu ra nước ngoài.</p>\n<p><img class="alignnone size-full wp-image-47691" src="https://thegioicaygiong.com/wp-content/uploads/2021/01/cay-bo-booth.jpg" alt="cây giống bơ booth 7" width="800" height="500" /></p>\n<p>Thời điểm thu hoạch của bơ booth 7 là từ <strong>tháng 9 đến tháng 11</strong>, sau khi thu hoạch từ trên cây xuống thì khoảng từ 4 đến 6 ngày bơ sẽ chín.</p>\n<p>Giống bơ booth 7 phù hợp trồng trên đất có <strong>tầng canh tác dày,</strong> pH thích hợp từ 5 &#8211; 6,5. Cây dễ bị bệnh thối rễ, nên cần <strong>đảm bảo thoát nước tốt.</strong></p>\n<p><img class="alignnone size-full wp-image-47692" src="https://thegioicaygiong.com/wp-content/uploads/2021/01/cay-giong-bo-booth-1.jpg" alt="cây giống bơ booth 7" width="800" height="500" /></p>\n<p>Cây phát triển tốt ở điều kiện nhiệt độ khoảng từ 14 &#8211; 25 độ C. Có khả năng cho trái <strong>sau 2 &#8211; 3 năm trồng</strong> tùy vào điều kiện chăm sóc. Năng suất có thể đạt từ 7 &#8211; 20 tấn/ha.</p>\n<p>Tỉ lệ đậu trái của <strong>giống bơ booth 7</strong> là 70 &#8211; 75% thịt có màu kem vàng dẻo và không có xơ. Chất lượng thịt cao phần hạt với quả khít lại với nhau, đạt đầy đủ các yếu tố của việc xuất khẩu ra nước ngoài.</p>\n<p><img class="alignnone size-full wp-image-47690" src="https://thegioicaygiong.com/wp-content/uploads/2021/01/bo-booth-trai-tron-1.jpg" alt="cây giống bơ booth 7" width="800" height="500" /></p>\n<p>Cây bơ booth cho năng suất cao ổn định từ <strong>160 &#8211; 180kg/cây</strong>, là giống bơ trái vụ nhưng lại có năng suất cao tương đồng với bơ chính vụ, mà giá thành bán ra cao nên mang lại thu nhập khủng cho hộ trồng trên diện tích lớn.</p>\n<h2><span style="color: #008000">MUA CÂY GIỐNG BƠ BOOTH 7 CHẤT LƯỢNG Ở ĐÂU</span></h2>\n<p>Việc trồng xen <strong>cây bơ booth 7</strong> cùng với cà phê giúp hộ trồng tăng cao thu nhập trên cùng một diện tích đất canh tác. Hiện tại mô hình trồng xen này chính là hướng đi mới cho ngành nông nghiệp của nước ta, giúp điều hòa khí hậu tăng cường độ ẩm cho đất và thích hợp lẫn cho cây cà phê giúp cả hai cùng phát triển tốt.</p>\n<p><img class="alignnone size-full wp-image-47693" src="https://thegioicaygiong.com/wp-content/uploads/2021/01/giong-bo-booth.jpg" alt="cây giống bơ booth 7" width="800" height="500" /></p>\n<p style="text-align: center"><em><a href="http://thegioicaygiong.com"><strong>Thế Giới Cây Giống</strong></a> chuyên cung cấp cây giống bơ booth 7 trái dài chất lượng, cây khỏe đẹp, sạch bệnh và có bảo hành đúng giống cho bà con.</em></p>\n<p>Giống bơ booth 7 này sẽ là một chọn lựa hoàn hảo cho bà con muốn thay đổi cơ cấu cây trồng. Bà con có nhu cầu mua <strong>cây giống bơ booth chất lượng</strong>, hãy liên hệ đến Thế Giới Cây Giống để được tư vấn nhé.</p>\n<p><span style="font-weight: 400">Liên hệ ngay với Thế Giới Cây Giống qua thông tin sau:</span></p>\n<div style="padding: 6px;height: auto;border: 2px dashed #FF4500">\n<p style="text-align: center"><span style="font-size: 20px;color: #008000"><b>Công ty TNHH MTV Thế giới cây giống</b></span><b><br />\n</b><b>Địa chỉ: 14 QL1A, ấp Long Bình, xã Long Hưng, Châu Thành, Tiền Giang</b></p>\n<p style="text-align: center"><b>Phone: <a href="tel:0784664499">0784664499 </a>&#8211; <a href="tel:0906194819">0906194819</a></b></p>\n<p style="text-align: center"><b>Fanpage: <span style="color: #ff6600"><a style="color: #ff6600" href="https://www.facebook.com/caygiongtiengiang/">https://www.facebook.com/caygiongtiengiang/ </a></span></b></p>\n</div>';

  return (
    <div className="description-container">
      <p
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: normalizeHtml(description),
        }}
      />
    </div>
    // <div className="description-container">
    //   {/* Tab chuyển đổi giữa description và review */}
    //   <div className="desc-tabs">
    //     <button
    //       className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
    //       onClick={() => setActiveTab("description")}
    //     >
    //       Chi tiết sản phẩm
    //     </button>
    //     <button
    //       className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
    //       onClick={() => setActiveTab("reviews")}
    //     >
    //       Đánh giá
    //     </button>
    //   </div>

    //   {/* Description */}
    //   <div className="tab-content">
    //     {activeTab === "description" ? (
    //       <div className="content-text">
    //         <h1 className="desc-h1">{data.name}</h1>

    //         <div className="desc-section">
    //           <h2 className="desc-h2">1. Đặc điểm nổi bật</h2>
    //           <p>{data.description}</p>
    //         </div>

    //         <div className="desc-section">
    //           <h2 className="desc-h2">2. Kỹ thuật trồng cây</h2>

    //           <div className="desc-item">
    //             <p>
    //               <strong>a) Thời vụ:</strong> {data.plantingTechnique.season}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.plantingTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>b) Lượng nước:</strong> {data.plantingTechnique.water}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.plantingTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>c) Đất trồng:</strong> {data.plantingTechnique.soil}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.plantingTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>d) Tiêu chuẩn cây giống:</strong>{" "}
    //               {data.plantingTechnique.seedling}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.plantingTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>e) Khoảng cách trồng:</strong>{" "}
    //               {data.plantingTechnique.spacing}
    //             </p>
    //           </div>
    //         </div>

    //         <div className="desc-section">
    //           <h2 className="desc-h2">3. Kỹ thuật chăm sóc</h2>

    //           <div className="desc-item">
    //             <p>
    //               <strong>a) Bón phân:</strong> {data.careTechnique.fertilizer}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.careTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>b) Tưới nước:</strong> {data.careTechnique.watering}
    //             </p>
    //             <div className="desc-img">
    //               <img src={data.careTechnique.img1} alt="img" />
    //             </div>
    //           </div>
    //           <div className="desc-item">
    //             <p>
    //               <strong>c) Phòng trừ sâu bệnh:</strong>{" "}
    //               {data.careTechnique.pestControl}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       // Reviews
    //       <div className="reviews-board">
    //         <div className="review-input-box">
    //           <h3>Viết đánh giá của bạn</h3>
    //           <form onSubmit={handleSubmitReview}>
    //             {/* Đánh giá star */}
    //             <div className="rating-select">
    //               <span>Chọn mức độ: </span>
    //               {[1, 2, 3, 4, 5].map((star) => (
    //                 <FiStar
    //                   key={star}
    //                   size={20}
    //                   className={
    //                     star <= newReview.rating
    //                       ? "star-select filled"
    //                       : "star-select"
    //                   }
    //                   onClick={() =>
    //                     setNewReview({ ...newReview, rating: star })
    //                   }
    //                 />
    //               ))}
    //             </div>

    //             <input
    //               type="text"
    //               placeholder="Tên của bạn..."
    //               className="input-name"
    //               value={newReview.name} //Tạo biến value = tên người dùng nhập vào
    //               /*
    //                                     "...newReview": gọi là Spread Operator
    //                                     => hiểu đơn giản: Copy toàn bộ những gì đang có trong cái giỏ cũ (rating, comment) sang cái giỏ mới (newReview)

    //                                     "name: e.target.value" => cập nhật only phần "name" khi người dùng nhập vào
    //                                     vd:
    //                                         State cũ: { name: "", rating: 5, comment: "Tốt" }

    //                                          õ chữ "A" vào ô name.

    //                                         => setNewReview({ ...copy_cũ, name: "A" })

    //                                         State mới: { name: "A", rating: 5, comment: "Tốt" }
    //                                 */
    //               onChange={(e) =>
    //                 setNewReview({ ...newReview, name: e.target.value })
    //               }
    //             />
    //             <div className="input-group">
    //               <textarea
    //                 placeholder="Chia sẻ cảm nhận về sản phẩm..."
    //                 className="input-comment"
    //                 rows="2"
    //                 value={newReview.comment}
    //                 onChange={(e) =>
    //                   setNewReview({ ...newReview, comment: e.target.value })
    //                 }
    //               ></textarea>

    //               {/* Emojis */}
    //               <button
    //                 type="button"
    //                 className="btn-emoji"
    //                 onClick={() => setShowEmoji(!showEmoji)} // gióng như công tắc bật/tắt (để khỏi cần phải tạo thêm nút tắt) emoji khi click vào icon tượng trưng
    //               >
    //                 <FiSmile size={24} />
    //               </button>

    //               <button type="submit" className="btn-send">
    //                 <FiSend />
    //               </button>
    //               {/* Chỉ show component Emojis khi showEmoji = true*/}
    //               {showEmoji && <Emojis onSelect={EmojiSelect} />}
    //             </div>
    //           </form>
    //         </div>

    //         <div className="review-list">
    //           {reviews.length === 0 ? (
    //             <p className="no-review">
    //               Chưa có đánh giá nào. Hãy là người đầu tiên!
    //             </p>
    //           ) : (
    //             reviews.map((item) => (
    //               <div key={item.id} className="review-item">
    //                 <div className="review-avatar">
    //                   <div className="avatar-placeholder">
    //                     <FiUser />
    //                   </div>
    //                 </div>

    //                 <div className="review-content">
    //                   <div className="review-header">
    //                     <span className="review-name">{item.name}</span>
    //                     <span className="review-date">{item.date}</span>
    //                   </div>

    //                   <div className="review-rating">
    //                     {renderStars(item.rating)}
    //                   </div>
    //                   <p className="review-comment">{item.comment}</p>
    //                 </div>
    //               </div>
    //             ))
    //           )}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
}

export default ProductDescription;

function normalizeHtml(html = "") {
  return html.replace(/\r?\n/g, "<br />");
}
