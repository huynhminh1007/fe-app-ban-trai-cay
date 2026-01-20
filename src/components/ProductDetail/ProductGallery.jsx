import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../../styles/ProductDetail_Style/ProductGallery.css";

const ProductGallery = ({ image = [] }) => {
  const images = image && image.length > 0 ? image : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return <div>Đang cập nhật ảnh...</div>;
  }

  const mainImgSrc = images[currentIndex].src || images[currentIndex].thumbnail;

  return (
    <div className="gallery-container">
      <div className="main-image-frame">
        <img src={mainImgSrc} alt="Product" className="main-img" />

        {images.length > 1 && (
          <>
            <button className="nav-btn prev" onClick={handlePrev}>
              <FiChevronLeft />
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              <FiChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="thumbnail-list">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className={`thumb-item ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={img.thumbnail || img.src} alt={`thumb-${index}`} />

              {index === currentIndex && <div className="progress-bar"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
