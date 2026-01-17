import "../styles/product_list.scss";
import ProductLink from "./navigation/ProductLink";
import { formatVND } from "./utils/Format";
import { updateQuantity } from "../fakeApi/cartApi";
import { showAddToCartToast, showCartErrorToast } from "./utils/Dialog";

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const mdGridCols = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function ProductListSection({
  className = "",
  title,
  products = [],
  cols = {
    base: 2,
    md: 4,
  },
}) {
  return (
    <section className={`product-list-section section-container ${className}`}>
      <div className="container product-list-section__inner md:rounded-lg py-4">
        <div className="heading-bar">
          <h2 className="title text-xl">
            <a href="">{title}</a>
          </h2>
        </div>

        <div
          className={`product-list mt-5 grid gap-4 md:gap-6 ${
            gridCols[cols.base]
          } ${mdGridCols[cols.md]}`}
        >
          {products.map((p, idx) => {
            const productImg = p.images[0];
            const regularPrice = p.prices.regular_price;
            const salePrice = p.prices.sale_price;

            return (
              <article
                key={p.id}
                className="product-card group bg-white shadow-sm overflow-hidden"
              >
                <div className="relative w-full">
                  {p.on_sale && (
                    <span className="product-card__badge">
                      {`-${Math.round(
                        ((regularPrice - salePrice) / regularPrice) * 100
                      )}%`}
                    </span>
                  )}
                  <ProductLink productId={p.id}>
                    <img
                      src={productImg.thumbnail}
                      alt={productImg.alt}
                      className="w-full h-auto object-cover"
                    />
                  </ProductLink>

                  {/* Overlay actions */}
                  <div className="product-card__overlay">
                    <button
                      type="button"
                      className="product-card__icon-btn"
                      onClick={async () => {
                        try {
                          await updateQuantity("1", p.id, 1);
                          showAddToCartToast();
                        } catch (err) {
                          showCartErrorToast(
                            "Không thể thêm sản phẩm vào giỏ hàng"
                          );
                        }
                      }}
                    >
                      <i className="fa-solid fa-cart-plus" />
                    </button>
                    <ProductLink
                      productId={p.id}
                      className="product-card__icon-btn"
                      aria-label="Xem chi tiết sản phẩm"
                    >
                      <i className="fa-solid fa-eye" />
                    </ProductLink>
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <h3 className="product-card__name line-clamp-2 text-sm mb-2">
                    <ProductLink productId={p.id}>{p.name}</ProductLink>
                  </h3>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="product-card__price text-base font-bold">
                        {formatVND(p.prices.price)}
                      </span>
                      {p.on_sale && (
                        <span className="product-card__old-price text-sm line-through">
                          {formatVND(p.prices.regular_price)}
                        </span>
                      )}
                    </div>

                    <span className="text-xs text-[#000000DE]">
                      Đã bán {p.totalSold}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
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
