import { useState, useEffect, useRef } from "react";
import "../styles/category_section.scss";
import mainBanner1 from "../res/imgs/main_banner_1.jpg";
import mainBanner2 from "../res/imgs/main_banner_2.jpg";
import mainBanner3 from "../res/imgs/main_banner_3.jpg";

const BANNERS = [mainBanner1, mainBanner2, mainBanner3];

const CATEGORIES = [
  {
    id: "cay-an-trai",
    label: "Cây ăn trái",
    icon: "fa-apple-whole",
    subs: null,
  },
  {
    id: "cay-canh",
    label: "Cây cảnh",
    icon: "fa-apple-whole",
    subs: null,
  },
  {
    id: "cay-cong-trinh",
    label: "Cây công trình",
    icon: "fa-apple-whole",
    subs: [
      {
        id: "thit-heo",
        label: "Thịt Heo Hữu Cơ",
        children: ["Thịt heo ba chỉ", "Thịt heo thăn", "Sườn heo"],
      },
      {
        id: "thuy-hai-san",
        label: "Thủy & Hải Sản",
        children: ["Thuỷ Sản", "Hải Sản"],
      },
      {
        id: "thit-bo",
        label: "Thịt Bò Hữu Cơ",
        children: ["Thịt Bò Tơ Tây Ninh", "Thịt Bò Obe"],
      },
      {
        id: "kho-mot-nang",
        label: "Khô & Một Nắng",
        children: ["Cá khô", "Tôm khô", "Mực khô"],
      },
      {
        id: "thit-gia-cam",
        label: "Thịt Gia Cầm - Trứng",
        children: ["Thịt gà", "Thịt vịt", "Trứng gà", "Trứng vịt"],
      },
    ],
  },
  {
    id: "cay-giong-si",
    label: "Cây giống sỉ",
    icon: "fa-apple-whole",
    subs: null,
  },
];

export default function CategorySection() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const intervalRef = useRef(null);

  const activeCategory = CATEGORIES.find((c) => c.id === activeId);
  const hasSubs = activeCategory && activeCategory.subs?.length;

  // Auto-play banner
  useEffect(() => {
    if (hasSubs || isBannerHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 3000); // Đổi banner mỗi 3 giây

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasSubs, isBannerHovered]);

  const goToNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const goToPrevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + BANNERS.length) % BANNERS.length
    );
  };

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  return (
    <section className="category-section section-container hidden md:block">
      <div className="container">
        <nav className="category-section__left">
          <ul>
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className="category-section__item"
                onMouseEnter={() => setActiveId(cat.id)}
              >
                <div className="category-section__content">
                  <i className={`fa-solid ${cat.icon}`} />
                  <span>
                    <a href="">{cat.label}</a>
                  </span>
                </div>

                {cat.subs && (
                  <i className="fa-solid fa-chevron-right category-section__arrow" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="category-section__right">
          {hasSubs ? (
            <div className="category-section__subs">
              {activeCategory.subs.map((group) => (
                <div key={group.id} className="flex flex-col items-start">
                  <a href="" className="font-bold text-sm mb-2">
                    {group.label}
                  </a>

                  {group.children && group.children.length > 0 && (
                    <ul className="flex flex-col gap-1 w-full">
                      {group.children.map((item, i) => (
                        <li key={i}>
                          <a href="" className="text-sm font-normal">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div
              className="category-section__banner-wrapper relative cursor-pointer"
              onMouseEnter={() => setIsBannerHovered(true)}
              onMouseLeave={() => setIsBannerHovered(false)}
            >
              <img
                src={BANNERS[currentBannerIndex]}
                alt="Khuyến mãi"
                className="category-section__banner"
              />

              {isBannerHovered && (
                <>
                  <button
                    type="button"
                    className="category-section__nav-btn category-section__nav-btn--prev"
                    onClick={goToPrevBanner}
                    aria-label="Banner trước"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    className="category-section__nav-btn category-section__nav-btn--next"
                    onClick={goToNextBanner}
                    aria-label="Banner sau"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              )}

              {isBannerHovered && (
                <div className="category-section__dots">
                  {BANNERS.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`category-section__dot ${
                        index === currentBannerIndex
                          ? "category-section__dot--active"
                          : ""
                      }`}
                      onClick={() => goToBanner(index)}
                      aria-label={`Chuyển đến banner ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
