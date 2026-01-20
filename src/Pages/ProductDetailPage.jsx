import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfor from "../components/ProductDetail/ProductInfor";
import ProductSimilar from "../components/ProductDetail/ProductSimilar";
import { getProductById } from "../fakeApi/productApi";
import "../styles/p.scss";
import { func } from "prop-types";
import { getReviews } from "../api/reviewApi";
import axiosClient from "../api/axiosClient";
import axios from "axios";

function ProductDetailPage() {
  // data của product Infor, description và gallery
  const { id } = useParams();
  const [currentProduct, setcurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      window.scrollTo(0, 0); // Cuộn lên đầu trang

      try {
        // Gọi hàm getProductById
        const product = await getProductById(id);

        setcurrentProduct(product);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Không tìm thấy sản phẩm
      </div>
    );
  }

  return (
    <div className="ProductDetailPage">
      {/* header */}
      <Header />

      {/* Main Product */}
      <main style={{ backgroundColor: "#f4f4f4", paddingBottom: "30px" }}>
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "20px auto",
            padding: "18px 15px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <div
            className="product-detail-layout"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              alignItems: "flex-start",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
              <ProductGallery image={currentProduct?.images || []} />
            </div>

            <div style={{ flex: "1 1 400px" }}>
              <ProductInfor product={currentProduct} />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            {/* <ProductDescription data={currentProduct} /> */}
            <ProductDescription product={currentProduct} />
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Comment productId={currentProduct.id} />
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <ProductSimilar />
          </div>
        </div>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}

export default ProductDetailPage;

function normalizeHtml(html = "") {
  return html.replace(/\r?\n/g, "<br />");
}

function ProductDescription({ product }) {
  return (
    <div className="similar-wrapper">
      <h2 className="section-title">Mô tả</h2>
      <p
        className="product-desc"
        dangerouslySetInnerHTML={{
          __html: normalizeHtml(product.description),
        }}
      />
    </div>
  );
}

const filters = [
  { key: "all", label: "Tất Cả" },
  { key: 5, label: "5 Sao" },
  { key: 4, label: "4 Sao" },
  { key: 3, label: "3 Sao" },
  { key: 2, label: "2 Sao" },
  { key: 1, label: "1 Sao" },
  { key: "comment", label: "Có Bình Luận" },
  { key: "image", label: "Có Hình Ảnh / Video" },
];
function Comment({ productId }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const productIdNumber = Number(productId);

  /** ✅ buildParams ổn định */
  const params = useMemo(() => {
    const p = { page, size: 5 };

    if (activeFilter === "comment") p.hasComment = true;
    else if (activeFilter === "image") p.hasImage = true;
    else if (typeof activeFilter === "number") p.rating = activeFilter;

    return p;
  }, [page, activeFilter]);

  /** ✅ fetchReviews chuẩn */
  const fetchReviews = useCallback(async () => {
    if (!Number.isInteger(productIdNumber)) return;

    console.log("🚀 fetchReviews CALLED", params);

    try {
      setLoading(true);

      const res = await axiosClient.get(`/reviews/${productIdNumber}`, {
        params,
      });

      console.log("API RES:", res);

      setReviews(res.data?.content ?? []);
      setTotalPages(res.data?.totalPages ?? 0);
    } catch (err) {
      console.error("Load review failed", err);
      setReviews([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [productIdNumber, params]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleFilterChange = (key) => {
    setActiveFilter(key);
    setPage(0);
  };

  return (
    <div className="similar-wrapper">
      <h2 className="section-title mb-4">ĐÁNH GIÁ SẢN PHẨM</h2>

      {/* ===== Tổng quan ===== */}
      <div className="con-1 flex gap-6 items-start mb-6">
        <div className="min-w-[140px]">
          <div className="text-rating text-3xl font-semibold">
            4.9 <span className="text-base text-gray-600">trên 5</span>
          </div>
          <div className="flex text-[#F2D21E] mt-1">
            {"★★★★★".split("").map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`px-3 py-1 border rounded text-sm
                ${
                  activeFilter === f.key
                    ? "border-[#FF4500] text-[#FF4500] min-w-[6.25rem]"
                    : "border-gray-300 text-gray-600"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Danh sách đánh giá ===== */}
      {loading ? (
        <p className="text-gray-500">Đang tải đánh giá...</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <img
                src={review.userAvatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <p className="font-medium">{review.userName}</p>

                {/* Sao */}
                <div className="flex text-[#F2D21E] text-sm">
                  {"★★★★★".slice(0, review.rating)}
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.date).toLocaleString()}
                </p>

                {/* Content */}
                {review.content && (
                  <p className="mt-2 text-sm text-gray-700">{review.content}</p>
                )}

                {/* Images */}
                {review.images?.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className="w-20 h-20 object-cover border rounded"
                        alt=""
                      />
                    ))}
                  </div>
                )}

                {/* Seller reply */}
                {review.sellerReply && (
                  <div className="bg-gray-100 p-3 mt-4 text-sm rounded">
                    <p className="font-medium mb-1">Phản Hồi Của Người Bán</p>
                    <p className="text-gray-600">{review.sellerReply}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded
                ${page === i ? "bg-[#FF4500] text-white" : "text-gray-600"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
