import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfor from "../components/ProductDetail/ProductInfor";
import ProductDescription from "../components/ProductDetail/ProductDescription";
import ProductSimilar from "../components/ProductDetail/ProductSimilar";

import { productdata } from "../Services/ProductData_Test/ProductData";

import { getProductById } from "../fakeApi/productApi";

function ProductDetailPage() {
  // Data của product Description
  const currentProductId = "1";

  // data của product Infor và product gallery
  const { id } = useParams();
  const [currentProduct, setcurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      window.scrollTo(0, 0); // Cuộn lên đầu trang

      try {
        // Gọi hàm getProductById
        // trả về thẳng object product hoặc null
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

  console.log("Dữ liệu productdata:", productdata); // Kiểm tra dữ liệu productdata

  const currentProductDescription = productdata.find(
    (item) => item.id === currentProductId,
  );

  if (!currentProductDescription) {
    return <div>Không tìm thấy sản phẩm! oke</div>;
  }

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
            gap: "30px", // khoảng gap giữa các components
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
            <ProductDescription data={currentProductDescription} />
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
