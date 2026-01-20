import "../styles/header.scss";
import logo from "../res/imgs/banner-cong-ty-TGCG.png";
import CircleIcon from "./utils/CircleIcon";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategorySection from "./CategorySection";
import { getCartCount } from "../fakeApi/cartApi";
import { getProducts } from "../fakeApi/productApi";
import { formatVND } from "./utils/Format";

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
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [checkUserLogin, setCheckUserLogin] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  const navigate = useNavigate();

  // Check user login
  useEffect(() => {
    if (user) {
      setCheckUserLogin(true);
    } else {
      setCheckUserLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCheckUserLogin(false);
    // navigate("/");
  };

  useEffect(() => {
    setCartCount(getCartCount("1"));
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setProducts([]);
      return;
    }

    getProducts({ search: debouncedSearch, limit: 10 }).then((res) => {
      setProducts(res.data);
      setShowDropdown(true);
    });
  }, [debouncedSearch]);

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

          <div className="relative flex-1">
            <form
              action=""
              role="search"
              className="header__search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="input-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              />

              <button
                type="submit"
                className="search-btn"
                aria-label="Tìm kiếm"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            {showDropdown && debouncedSearch && products.length === 0 && (
              <ul className="search-list">
                <li>Không tìm thấy sản phẩm</li>
              </ul>
            )}

            {showDropdown && products.length > 0 && (
              <ul className="search-list">
                {products.map((p) => {
                  return (
                    <li
                      key={p.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onMouseDown={() => {
                        setShowDropdown(false);
                        navigate(
                          `/products?search=${encodeURIComponent(p.name)}`,
                        );
                      }}
                    >
                      <div className="search-product-card flex">{p.name}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Khối thông tin – ẩn trên mobile, hiện từ md trở lên */}
        <div className="hidden items-center gap-6 md:flex md:ml-3">
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
                {checkUserLogin ? (
                  <Link to="/login" onClick={handleLogout}>
                    Đăng xuất
                  </Link>
                ) : (
                  <Link to="/login">Đăng nhập</Link>
                )}
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
    <div className="hidden md:block header__sub relative">
      <div className="container flex items-center gap-10">
        <div
          className="header__item mr-10 py-2"
          onMouseEnter={() => setIsHoverCategory(true)}
          onMouseLeave={() => setIsHoverCategory(false)}
        >
          <i className="fa-solid fa-bars"></i>
          <span>
            <Link to="/products">Danh sách sản phẩm</Link>
          </span>
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
