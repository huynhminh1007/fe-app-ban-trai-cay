import { useState, useEffect, useRef } from "react";
import "../styles/category_section.scss";
import mainBanner1 from "../res/imgs/main_banner_1.jpg";
import mainBanner2 from "../res/imgs/main_banner_2.jpg";
import mainBanner3 from "../res/imgs/main_banner_3.jpg";
import { getCategoryForMenu } from "../fakeApi/categoryApi";
import { Link } from "react-router-dom";

const BANNERS = [mainBanner1, mainBanner2, mainBanner3];

export default function CategorySection({ className = "", onHoverChange }) {
  const [categories, setCategories] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isHoveringCategory, setIsHoveringCategory] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    getCategoryForMenu().then((data) => {
      setCategories(data);
      if (data.length) setActiveId(data[0].id);
    });
  }, []);

  const activeCategory = categories.find((c) => c.id === activeId);
  const showSubs = isHoveringCategory && activeCategory?.subs?.length > 0;

  // Auto-play banner
  useEffect(() => {
    if (showSubs || isBannerHovered) {
      intervalRef.current && clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 3000);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [showSubs, isBannerHovered]);

  const goToNextBanner = () =>
    setCurrentBannerIndex((prev) => (prev + 1) % BANNERS.length);

  const goToPrevBanner = () =>
    setCurrentBannerIndex(
      (prev) => (prev - 1 + BANNERS.length) % BANNERS.length,
    );

  const goToBanner = (index) => setCurrentBannerIndex(index);

  return (
    <section
      className={`category-section ${className}`}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div
        className="container"
        onMouseLeave={() => setIsHoveringCategory(false)}
      >
        {/* LEFT */}
        <nav className="category-section__left">
          <ul>
            {categories.map((cat) => (
              <Link to={`/products?category=${cat.id}`}>
                <li
                  key={cat.id}
                  className="category-section__item"
                  onMouseEnter={() => {
                    setActiveId(cat.id);
                    if (cat.subs) setIsHoveringCategory(true);
                  }}
                >
                  <div className="category-section__content">
                    <i className="fa-solid fa-apple-whole" />
                    <span>{cat.label}</span>
                  </div>

                  {cat.subs && (
                    <i className="fa-solid fa-chevron-right category-section__arrow" />
                  )}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* RIGHT */}
        <div className="category-section__right">
          {showSubs ? (
            <div className="category-section__subs h-full">
              {activeCategory.subs.map((group) => (
                <div key={group.id} className="flex flex-col items-start">
                  <Link
                    className="font-bold text-sm mb-2"
                    to={`/products?category=${group.id}`}
                  >
                    {group.label}
                  </Link>

                  {group.subs?.length > 0 && (
                    <ul className="flex flex-col gap-1 w-full">
                      {group.subs.map((lv3) =>
                        lv3.id === "__more__" ? (
                          <li key="more" className="text-xs text-gray-400">
                            ...
                          </li>
                        ) : (
                          <li key={lv3.id}>
                            <Link
                              to={`/products?category=${lv3.id}`}
                              className="text-sm font-normal hover:text-primary"
                            >
                              {lv3.label}
                            </Link>
                          </li>
                        ),
                      )}
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
              <div
                className="category-section__banner-track"
                style={{
                  transform: `translateX(-${currentBannerIndex * 100}%)`,
                }}
              >
                {BANNERS.map((src, i) => (
                  <div className="category-section__banner-slide" key={i}>
                    <img src={src} alt={`Banner ${i + 1}`} />
                  </div>
                ))}
              </div>

              {isBannerHovered && (
                <>
                  <button
                    type="button"
                    className="category-section__nav-btn category-section__nav-btn--prev"
                    onClick={goToPrevBanner}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    type="button"
                    className="category-section__nav-btn category-section__nav-btn--next"
                    onClick={goToNextBanner}
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
