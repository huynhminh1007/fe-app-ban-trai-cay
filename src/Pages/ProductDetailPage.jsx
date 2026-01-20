import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfor from "../components/ProductDetail/ProductInfor";
import ProductSimilar from "../components/ProductDetail/ProductSimilar";
import { getProductById } from "../fakeApi/productApi";
import "../styles/p.scss";
import Reviews from "../components/Reviews";

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
            <Reviews productId={currentProduct.id} />
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
