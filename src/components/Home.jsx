import Header from "./Header";
import BrandSection from "./BrandSection";
import ProductListSection from "./ProductListSection";
import test1 from "../res/imgs/anh_test_1.jpg";
import cusComment1Img from "../res/imgs/customer_comment_1.jpg";
import cusComment2Img from "../res/imgs/customer_comment_2.jpg";
import cusComment3Img from "../res/imgs/customer_comment_3.jpg";
import cusComment4Img from "../res/imgs/customer_comment_4.jpg";
import phoneIcon from "../res/imgs/phone.png";
import "../styles/home.scss";
import NewsSection from "./NewsSection";
import Footer from "./Footer";
import { getProducts } from "../fakeApi/productApi";
import { useEffect, useState } from "react";
import { getPosts } from "../fakeApi/postApi";
import { Link } from "react-router-dom";

const cusComment1 = {
  title: "Mr.Hoàng",
  content:
    "“Tôi đã mua hàng tại Thế giới chi nhánh Cai Lậy & được tham gia chương trình rút thăm may mắn trúng thưởng & được mua cây giảm giá sốc. Sẽ quay lại nơi này mua cây giống thường xuyên”.",
  image: cusComment1Img,
};

const cusComment2 = {
  title: "Mr.Nam",
  content:
    "“Đây là Công ty chuyên cung cấp giống uy tín, chất lượng nên bà con yên tâm cứ yên tâm nhé. Mua hàng ở đây còn được tặng những phần quà ý nghĩa sẽ giới thiệu cho người thân đến đây mua cây giống.”",
  image: cusComment2Img,
};

const cusComment3 = {
  title: "Mr.Minh",
  content:
    "“Tôi đã mua hàng ở đây 1 lần mặc dù chỉ có vài cây nhưng ấn tượng cách nhân viên phục vụ rất tận tình & có hướng dẫn kỹ thuật chăm sóc và cách trồng cây chu đáo.”",
  image: cusComment3Img,
};

const cusComment4 = {
  title: "Mr.Thắng",
  content:
    "“Tôi đã mua cây giống ở nhiều cửa hàng nhưng tại Thế giống cây giống được bảo hành & cây giống bảo đảm, nhân viên rất vui vẻ và nhiệt tình sẽ quay lại mua thêm nếu có nhu cầu.”",
  image: cusComment4Img,
};

const cusComments = [cusComment1, cusComment2, cusComment3, cusComment4];

export default function Home() {
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  useEffect(() => {
    getProducts({ onSale: true }).then((res) => setOnSaleProducts(res.data));
    getProducts({ orderBy: "totalSold", limit: 8 }).then((res) =>
      setTopSellingProducts(res.data),
    );
    getPosts({ categoryId: 25, limit: 4 }).then((res) => setPosts(res.data));
    getPosts({ categoryId: 21, limit: 5 }).then((res) => setNewPosts(res.data));
  }, []);

  return (
    <div id="homePage">
      <Header />

      <div className="page-wrapper">
        <BrandSection className="mb-[30px] mt-[30px]" />
        <ProductListSection
          className="mb-[30px]"
          title="Sản phẩm bán chạy"
          products={topSellingProducts}
          categoryId={493}
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
                    {newPosts.map((item) => (
                      <li
                        className="border border-[#ececec] p-[10px]"
                        key={item.id}
                      >
                        <Link to={`/posts/${item.id}`} className="news-link">
                          {item.title}
                        </Link>
                      </li>
                    ))}
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
                products={onSaleProducts}
                cols={{ base: 2, md: 3 }}
                categoryId={494}
              />

              <NewsSection
                className="mb-[30px]"
                title="Kỹ thuật trồng cây"
                news={posts}
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
