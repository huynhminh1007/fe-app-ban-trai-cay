import "../styles/product_list.scss";
import { formatVND } from "./utils/Format";

export default function ProductListSection({
  className = "",
  title,
  products = [],
}) {
  return (
    <section className={`product-list-section section-container ${className}`}>
      <div className="container product-list-section__inner md:rounded-lg py-4">
        <div className="heading-bar">
          <h2 className="title text-xl">
            <a href="">{title}</a>
          </h2>
        </div>

        <div className="product-list mt-3 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
          {products.map((p, idx) => (
            <article
              key={p.id || idx}
              className="product-card group bg-white shadow-sm overflow-hidden"
            >
              <div className="relative w-full">
                {p.badge && (
                  <span className="product-card__badge">{`-${p.badge}`}</span>
                )}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-auto object-cover"
                />

                {/* Overlay actions */}
                <div className="product-card__overlay">
                  <button type="button" className="product-card__icon-btn">
                    <i className="fa-solid fa-cart-plus" />
                  </button>
                  <a type="button" className="product-card__icon-btn">
                    <i className="fa-solid fa-eye" />
                  </a>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-1">
                <h3 className="product-card__name line-clamp-2 text-sm">
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="product-card__price text-base font-bold">
                    {formatVND(p.price)}
                  </span>
                  {p.oldPrice && (
                    <span className="product-card__old-price text-sm line-through">
                      {formatVND(p.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-2">
          <a className="product-list-section__see-more">
            Xem tất cả
            <i className="fas fa-chevron-right ml-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
