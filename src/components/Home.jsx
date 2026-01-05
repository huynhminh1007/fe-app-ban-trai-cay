import Header from "./Header";
import CategorySection from "./CategorySection";
import BrandSection from "./BrandSection";
import ProductListSection from "./ProductListSection";
import product1Img from "../res/imgs/product_1.jpg";
import test1 from "../res/imgs/anh_test_1.jpg";
import news1 from "../res/imgs/news_1.jpg";
import cusComment1 from "../res/imgs/customer_comment_1.jpg";
import phoneIcon from "../res/imgs/phone.png";
import "../styles/home.scss";
import NewsSection from "./NewsSection";
import Footer from "./Footer";

const baseProduct = {
  name: "Cây Giống Sầu riêng Musang King D197 gốc tiêu chuẩn",
  price: 9900,
  oldPrice: 10000,
  image: product1Img,
  badge: "14%",
};

const products = [...Array(6)].map((_, i) => ({
  ...baseProduct,
  id: i + 1,
}));

const baseNews = {
  title:
    "Điều kiện tự nhiên của tỉnh Cà Mau thích hợp trồng những loại cây ăn trái nào?",
  content:
    "Thành công trồng cây ăn trái ở vùng đất có khí hậu, thổ nhưỡng [...]",
  image: news1,
};

const news = [...Array(4)].map((_, i) => ({
  ...baseNews,
  id: i + 1,
}));

const baseCusComment = {
  title: "Mr.Hoàng",
  content:
    "“Tôi đã mua hàng tại Thế giới chi nhánh Cai Lậy & được tham gia chương trình rút thăm may mắn trúng thưởng & được mua cây giảm giá sốc. Sẽ quay lại nơi này mua cây giống thường xuyên”.",
  image: cusComment1,
};

const cusComments = [...Array(4)].map((_, i) => ({
  ...baseCusComment,
  id: i + 1,
}));

export default function Home() {
  return (
    <div id="homePage">
      <Header />

      <div className="page-wrapper">
        <BrandSection className="mb-[30px] mt-[30px]" />
        <ProductListSection
          className="mb-[30px]"
          title="Sản phẩm bán chạy"
          products={products}
        />

        <section className="home-section__2 section-container mb-[30px]">
          <div className="container grid grid-cols-1 md:grid-cols-[2fr_8fr] gap-8">
            <div className="home-section__2-left">
              <div className="bg-white border border-gray-300 overflow-hidden">
                <span className="title">Hỗ trợ trực tuyến</span>

                <div className="p-[10px]">
                  <h5>Tư vấn chọn giống</h5>
                  <span className="icon-tt"></span>
                  <a href="" className="text-primary">
                    0784664499
                  </a>

                  <br />

                  <h5>Hỗ trợ mua hàng</h5>
                  <span className="icon-tt"></span>
                  <a href="" className="text-primary">
                    0906194819
                  </a>
                </div>
              </div>

              <div className="bg-white border border-gray-300 overflow-hidden mt-[30px]">
                <span className="title">Tin tức giá cả thị trường</span>

                <div>
                  <ul className="news">
                    <li className="border border-[#ececec] p-[10px]">
                      <a href="">
                        Điều kiện tự nhiên của tỉnh Cà Mau thích hợp trồng những
                        loại cây ăn trái nào?
                      </a>
                    </li>

                    <li className="border border-[#ececec] p-[10px]">
                      <a href="">Mít có thể chịu được mặn không?</a>
                    </li>

                    <li className="border border-[#ececec] p-[10px]">
                      <a href="">Sầu riêng có trồng được ở Long An không?</a>
                    </li>

                    <li className="border border-[#ececec] p-[10px]">
                      <a href="">
                        Long An trồng cây ăn quả gì để năng suất tốt, giá trị
                        kinh tế cao?
                      </a>
                    </li>

                    <li className="border border-[#ececec] p-[10px]">
                      <a href="">
                        Măng cụt có chịu mặn được không? Hướng dẫn trồng và chăm
                        sóc cây măng cụt đúng cách.
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-gray-300 overflow-hidden mt-[30px]">
                <span className="title">Sầu Riêng Thái Monthong</span>
                <img src={test1} alt="" className="w-full" />
              </div>
            </div>

            <div className="home-section__2-right">
              <ProductListSection
                className="mb-[30px]"
                title="Sản phẩm đang giảm giá"
                products={products}
                cols={{ base: 2, md: 3 }}
              />

              <NewsSection
                className="mb-[30px]"
                title="Kỹ thuật trồng cây"
                news={news}
                cols={{ base: 1, md: 2 }}
              />

              <NewsSection
                className="mb-[30px]"
                title="Ý kiến khách hàng"
                news={cusComments}
                cols={{ base: 1, md: 2 }}
              />
            </div>
          </div>
        </section>

        <div className="hotline-bar">
          <div className="hotline-phone-ring">
            <div className="hotline-phone-ring__circle"></div>

            <div className="hotline-phone-ring__circle__fill"></div>

            <div className="hotline-phone-ring__img__circle">
              <a href="tel:0906194819" className="pps-btn-img">
                <img src={phoneIcon} alt="Gọi điện thoại" />
              </a>
            </div>
          </div>
          <a href="tel:0906194819" className="ml-2">
            <span className="text-hotline">0906194819</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
