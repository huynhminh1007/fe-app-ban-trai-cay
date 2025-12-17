import { useState } from "react";
import "../styles/category_section.scss";
import mainBanner1 from "../res/imgs/main_banner_1.jpg";

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
      { id: "viet", label: "Trái Cây Việt" },
      { id: "nhap-khau", label: "Trái Cây Nhập Khẩu" },
      { id: "nuoc-ep", label: "Nước Ép Trái Cây Tươi" },
      { id: "say-dong-lanh", label: "Trái Cây Sấy - Đông Lạnh" },
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

  const activeCategory = CATEGORIES.find((c) => c.id === activeId);
  const hasSubs = activeCategory && activeCategory.subs?.length;

  return (
    <section className="category-section">
      <div className="container category-section__inner">
        {/* Left menu */}
        <div className="category-section__left">
          {CATEGORIES.map((cat) => (
            <li
              key={cat.id}
              className={`category-section__item ${
                cat.id === activeId ? "category-section__item--active" : ""
              }`}
              onMouseEnter={() => setActiveId(cat.id)}
            >
              <div className="category-section__item-main">
                <i className={`fa-solid ${cat.icon}`} />
                <span>
                  <a href="">{cat.label}</a>
                </span>
              </div>
              {cat.subs && (
                <i className="fa-solid fa-chevron-right category-section__item-arrow" />
              )}
            </li>
          ))}
        </div>

        {/* Right panel */}
        <div className="category-section__right">
          {hasSubs ? (
            <div className="category-section__subs">
              {activeCategory.subs.map((sub) => (
                <div key={sub.id} className="category-section__sub-group">
                  <h4>{sub.label}</h4>
                </div>
              ))}
            </div>
          ) : (
            <img
              src={mainBanner1}
              alt="Khuyến mãi"
              className="category-section__banner"
            />
          )}
        </div>
      </div>
    </section>
  );
}
