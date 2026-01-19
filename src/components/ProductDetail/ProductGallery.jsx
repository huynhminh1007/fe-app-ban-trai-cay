import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/ProductDetail_Style/ProductGallery.css';

const ProductGallery = ({ image = [] }) => {
    // Danh sách images.thumbnail
    const images = image && image.length > 0 ? image : [];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Nút điều hướng
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };


    const [isHovering, setIsHovering] = useState(false); // kiểm tra chuột có vào ảnh không 
    // Auto sliding
    React.useEffect(() => {
        if (isHovering) { // đang hover thì không chạy auto slide
            return;
        }
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // 3s chay 1 lần
        return () => clearInterval(interval);
    }, [currentIndex, isHovering]);


    // Zoom ảnh
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect(); // chỉ lấy thông tin vị trí và kích thước ảnh khi chuột trỏ vào
        /*
           e.pageX: vị trí của chuột tính từ mép trái toàn màn hình (e.pageY tương tự với mép trên)
           left: vị trí mép trái của ảnh 
           width: chiều rộng ảnh
        */
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        e.target.style.transformOrigin = `${x}% ${y}%`;
    }

    if (images.length === 0) return <div>Đang cập nhật ảnh...</div>;
    const mainImgSrc = images[currentIndex].src || images[currentIndex].thumbnail;

    return (
        <div className="gallery-container">
            {/* Ảnh chính */}
            <div className="main-image-frame"
                onMouseEnter={() => setIsHovering(true)} // vào chuột -> dừng slide, Bật zoom
                onMouseLeave={() => setIsHovering(false)} // ngược lại
            >
                <img
                    src={mainImgSrc}
                    alt="Product"
                    className={`main-img ${isHovering ? 'zoomed' : ''}`}
                    onMouseMove={handleMouseMove} // lắng nghe chuột
                />

                <button className="nav-btn prev" onClick={handlePrev}><FiChevronLeft /></button>
                <button className="nav-btn next" onClick={handleNext}><FiChevronRight /></button>
            </div>

            {/* List ảnh nhỏ*/}
            <div className="thumbnail-list">
                {images.map((img, index) => (
                    <div
                        // Dùng img.id làm key 
                        key={img.id || index}
                        className={`thumb-item ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {/* show IMAGES.THUMBNAIL  */}
                        <img src={img.thumbnail} alt={`thumb-${index}`} />

                        {index === currentIndex && !isHovering && images.length > 1 && (
                            <div className="progress-bar"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
