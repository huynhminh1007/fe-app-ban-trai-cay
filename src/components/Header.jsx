import "../styles/header.scss";
import logo from "../res/imgs/banner-cong-ty-TGCG.png";
import CircleIcon from "./utils/CircleIcon";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { useLocation, useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import { getCartCount } from "../fakeApi/cartApi";

export default function Header() {
  return (
    <div className="header">
      <TopHeader />
      <MainHeader />
      <SubHeader />
    </div>
  );
}

function TopHeader() {
  return (
    <div className="header__top">
      <picture>
        <a href="/" title="Banner Top">
          <img className="banner" src={logo} alt="Banner Top" />
        </a>
      </picture>
    </div>
  );
}

function MainHeader() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const navigate = useNavigate();

  useEffect(() => {
    setCartCount(getCartCount("1"));
  });

  return (
    <header className="header__main">
      <div className="container header__utility text-base py-4">
        {/* Thanh bên trái: nút menu (mobile) + ô tìm kiếm */}
        <div className="flex flex-1 gap-3 items-center">
          <span
            className="flex h-10 items-center justify-center rounded-md text-xl md:hidden"
            aria-label="Mở menu"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-bars" />
          </span>

          <form
            action=""
            role="search"
            className="header__search md:mr-3 flex-1"
          >
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="input-search"
            />

            <button type="submit" className="search-btn" aria-label="Tìm kiếm">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        {/* Khối thông tin – ẩn trên mobile, hiện từ md trở lên */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="header__item">
            <CircleIcon className="header__icon">
              <i className="fa-solid fa-phone"></i>
            </CircleIcon>

            <div>
              <div>Hỗ trợ khách hàng</div>
              <div className="font-bold text-sm">02873071088</div>
            </div>
          </div>

          <div className="header__item">
            <CircleIcon className="header__icon">
              <i className="fa-solid fa-user header__icon"></i>
            </CircleIcon>

            <div>
              <div className="header__item-title">Tài khoản</div>
              <div className="header__link">
                <a href="">Đăng nhập</a>
              </div>
            </div>
          </div>
        </div>

        {/* Cụm giỏ hàng + chuông – luôn hiện, nhưng thu gọn trên mobile */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="header__cart"
            onClick={() => navigate("/cart")}
          >
            <span className="header__cart-icon">
              <i className="fas fa-shopping-bag"></i>
            </span>
            <span className="hidden text-sm md:inline">Giỏ hàng</span>
            <span className="text-xs md:text-sm">{cartCount}</span>
          </button>

          <button type="button" className="hidden md:grid header__icon-btn">
            <i className="fa-solid fa-bell text-lg" />
            <span className="header__badge header__badge--dot" />
          </button>
        </div>
      </div>

      {/* Side menu bên trái (mobile) */}
      {isMenuOpen && <SideMenu onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}

function SubHeader() {
  const [isHoverCategory, setIsHoverCategory] = useState(false);
  const [isHoverCategorySection, setIsHoverCategorySection] = useState(false);
  const location = useLocation();

  const ALWAYS_SHOW_CATEGORY = ["/", "/home"];
  const isAlwaysShow = ALWAYS_SHOW_CATEGORY.includes(location.pathname);

  const showOverlay = isHoverCategory || isHoverCategorySection;

  return (
    <div
      className="hidden md:block header__sub relative"
      onMouseEnter={() => setIsHoverCategory(true)}
      onMouseLeave={() => setIsHoverCategory(false)}
    >
      <div className="container flex items-center gap-10 py-2">
        <div className="header__item mr-10">
          <i className="fa-solid fa-bars"></i>
          <span>Danh sách sản phẩm</span>
        </div>

        <div className="header__item">
          <i className="fa-solid fa-leaf"></i>
          <span>Chứng nhận cây giống</span>
        </div>

        <div className="header__item">
          <i className="fa-solid fa-certificate"></i>
          <span>Hàng sỉ hữu cơ / tự nhiên giá tốt</span>
        </div>
      </div>

      {/* Trang luôn hiển thị: render bình thường -> đẩy layout */}
      {isAlwaysShow && (
        <CategorySection className="hidden md:block section-container" />
      )}

      {/* Trang khác: chỉ hover mới hiện & overlay */}
      {!isAlwaysShow && showOverlay && (
        <div className="header__category-overlay">
          <CategorySection onHoverChange={setIsHoverCategorySection} />
        </div>
      )}
    </div>
  );
}
