import logo from './logo.svg';
// import Header from '../src/components/Layout/Header';
// import Footer from '../src/components/Layout/Footer';
import ProductGallery from '../src/components/ProductDetail/ProductGallery';
import ProductInfor from '../src/components/ProductDetail/ProductInfor';
import ProductDescription from '../src/components/ProductDetail/ProductDescription';
import ProductSimilar from '../src/components/ProductDetail/ProductSimilar';

import { productdata } from '../src/Services/ProductData_Test/ProductData';

function ProductDetailPage() {

  const currentProductId = "1";

  console.log("Dữ liệu productdata:", productdata); // Kiểm tra dữ liệu productdata

  const currentProduct = productdata.find(item => item.id === currentProductId);

  if (!currentProduct) {
    return <div>Không tìm thấy sản phẩm! oke</div>;
  }

  return (
    <div className="ProductDetailPage">
      {/* header */}
      {/* <Header /> */}

      {/* Main Produtc */}
      <main style={{ backgroundColor: '#fff', paddingBottom: '30px' }}>
        <div className="container"
          style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 15px' }}
        >
          <div className="product-detail-layout"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              alignItems: 'flex-start'
            }}>

            <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
              <ProductGallery />
            </div>

            <div style={{ flex: '1 1 400px' }}>
              <ProductInfor />
            </div>

          </div>

          <ProductDescription data={currentProduct} />

          <ProductSimilar />
        </div>
      </main>

      {/* footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default ProductDetailPage;
