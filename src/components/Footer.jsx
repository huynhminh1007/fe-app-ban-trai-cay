import "../styles/footer.scss";
import logo from "../res/imgs/logoSaleNoti.png";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-wrapper__main text-xs text-white">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-6 py-[40px]">
          <div className="item-col">
            <aside id="contact-info-widget" className="">
              <h3 className="widget-title">
                Công ty TNHH MTV Thế Giới Cây Giống
              </h3>

              <div className="contact-info">
                <p>
                  <strong>Mã số thuế:</strong> 1201489551
                  <br />
                  <strong> Cấp ngày:</strong> 26/1/2015
                  <br />
                  Quản lý bởi Chi cục Thuế khu vực Cai Lậy
                </p>

                <ul className="contact-detail">
                  <li>
                    <i class="fa-solid fa-location-dot"></i>
                    <span>
                      <strong>Địa chỉ: </strong>
                      Số 64 Tổ 3, Ấp 14, Xã Long Trung, Huyện Cai Lậy, Tỉnh Tiền
                      Giang, Việt Nam
                    </span>
                  </li>

                  <li>
                    <i class="fa-solid fa-phone"></i>
                    <span>
                      <strong>Phone: </strong>
                      0784664499-0906194819
                    </span>
                  </li>

                  <li>
                    <i class="fa fa-envelope"></i>
                    <span>
                      <strong>Email: </strong>
                      <a href="">thegioicaygiong.com@gmail.com</a>
                    </span>
                  </li>

                  <li>
                    <i class="fa-solid fa-clock"></i>
                    <span>
                      <strong>Góp ý khiếu nại: </strong>
                      0832851839
                    </span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <div className="item-col">
            <aside className="">
              <h3 className="widget-title">Hỗ trợ khách hàng</h3>

              <div className="">
                <ul className="footer-list">
                  <li>
                    <a href="">Hướng dẫn đặt hàng</a>
                  </li>
                  <li>
                    <a href="">Gửi yêu cầu hỗ trợ</a>
                  </li>
                </ul>

                <div className="item-col">
                  <h3 className="widget-title mt-6">Thống kê</h3>
                  <ul>
                    <li className="!mt-0">
                      <span>
                        <strong>Lượt truy cập:</strong> 2025238
                      </span>
                    </li>
                  </ul>
                </div>

                <a href="">
                  <img src={logo} alt="" />
                </a>
              </div>
            </aside>
          </div>

          <div className="item-col">
            <aside className="">
              <h3 className="widget-title">Chính sách</h3>

              <div className="">
                <ul className="footer-list">
                  <li>
                    <a href="">Chính sách và quy định chung</a>
                  </li>
                  <li>
                    <a href="">Chính sách hoàn trả và thanh toán</a>
                  </li>
                  <li>
                    <a href="">Chính sách vẫn chuyển</a>
                  </li>
                  <li>
                    <a href="">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="">Hợp tác kinh doanh</a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          <div className="item-col">
            <aside className="facebook-widget hidden md:block">
              <h3 className="widget-title">Fanpage Facebook</h3>

              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcaygiongtiengiang&tabs=timeline&width=340&height=200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="200"
                scrolling="no"
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </aside>
          </div>
        </div>
      </div>

      <div className="footer-wrapper__bottom bg-[#e36c0a]">
        <div className="container flex items-center justify-center p-[10px_8px]">
          <span className="uppercase text-white text-xs font-[500]">
            Công ty TNHH MTV thế giới cây giống
          </span>
        </div>
      </div>
    </footer>
  );
}
