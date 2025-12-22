import Header from "./Header";
import CategorySection from "./CategorySection";
import BrandSection from "./BrandSection";
import ProductListSection from "./ProductListSection";
import product1Img from "../res/imgs/product_1.jpg";

const baseProduct = {
  name: "Cây Giống Sầu riêng Musang King D197 gốc tiêu chuẩn",
  price: 9900,
  oldPrice: 10000,
  image: product1Img,
  badge: "14%",
};

const products = [...Array(10)].map((_, i) => ({
  ...baseProduct,
  id: i + 1,
}));

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <CategorySection className="hidden md:block mb-[30px]" />
      <BrandSection className="mb-[30px]" />
      <ProductListSection
        className="mb-[30px]"
        title="Sản phẩm bán chạy"
        products={products}
      />
    </div>
  );
}
