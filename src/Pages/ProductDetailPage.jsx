import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGallery from '../components/ProductDetail/ProductGallery';
import ProductInfor from '../components/ProductDetail/ProductInfor';
import ProductDescription from '../components/ProductDetail/ProductDescription';
import ProductSimilar from '../components/ProductDetail/ProductSimilar';

import { productdata } from '../Services/ProductData_Test/ProductData';

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
      <Header />

      {/* Main Product */}
       <main style={{ backgroundColor: '#f4f4f4', paddingBottom: '30px' }}>
         
         <div className="container"
           style={{ 
             maxWidth: '1200px', 
             margin: '20px auto', 
             padding: '18px 15px',
             display: 'flex',      
             flexDirection: 'column', 
             gap: '30px'            // khoảng gap giữa các components
           }}
         >
           
           <div className="product-detail-layout"
             style={{
               display: 'flex',
               flexWrap: 'wrap',
               gap: '40px',
               alignItems: 'flex-start',
               backgroundColor: '#fff', 
               padding: '20px',
               borderRadius: '8px'
             }}>
 
             <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
               <ProductGallery />
             </div>
 
             <div style={{ flex: '1 1 400px' }}>
               <ProductInfor />
             </div>
 
           </div>
 
           <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
              <ProductDescription data={currentProduct} />
           </div>
 
           <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
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
