import "../styles/product_list_page.scss";
import Header from "./Header";
import { buildCategoryTree, getCategories } from "../fakeApi/categoryApi";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../fakeApi/productApi";
import Footer from "./Footer";
import "../styles/product_list.scss";
import ProductLink from "./navigation/ProductLink";
import { updateQuantity } from "../fakeApi/cartApi";
import { showAddToCartToast, showCartErrorToast } from "./utils/Dialog";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../utils/updateSearchParams";

export default function ProductListPage() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : null;

  const fromPrice = searchParams.get("from")
    ? Number(searchParams.get("from"))
    : null;

  const toPrice = searchParams.get("to")
    ? Number(searchParams.get("to"))
    : null;

  const [priceInput, setPriceInput] = useState({ from: "", to: "" });

  useEffect(() => {
    setPriceInput({
      from: fromPrice ? String(fromPrice) : "",
      to: toPrice ? String(toPrice) : "",
    });
  }, [fromPrice, toPrice]);

  const categoryTree = buildCategoryTree(categories);

  const selectedCategory = useMemo(() => {
    if (!categoryId) return null;
    return findCategoryById(categoryTree, categoryId);
  }, [categoryTree, categoryId]);

  useEffect(() => {
    getCategories({ limit: 1000 }).then((res) => setCategories(res.data));
  }, []);

  return (
    <>
      <Header />
      <div className="product-list-page">
        <div className="section-container">
          <div className="container grid grid-cols-1 md:grid-cols-[2.5fr_7.5fr] gap-8 my-[30px]">
            <div>
              <div className="plp_item bg-white border border-gray-300 overflow-hidden">
                <h3 className="item__title">Danh mục cây giống</h3>
                <CategoryTree
                  categories={categories}
                  activeId={categoryId}
                  onChangeCategory={(id) =>
                    updateSearchParams(searchParams, setSearchParams, {
                      category: id,
                      page: 1,
                    })
                  }
                />
              </div>

              <div className="plp_item bg-white border border-gray-300 overflow-hidden mt-[20px]">
                <h3 className="item__title">Bộ lọc tìm kiếm</h3>
                <div className="item__block">
                  <h3>Khoảng giá</h3>
                  <div className="item__block-body flex items-center">
                    <input
                      type="text"
                      value={formatVND(priceInput.from)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setPriceInput({ ...priceInput, from: raw });
                      }}
                      placeholder="₫ TỪ"
                    />

                    <div className="range-line mx-2"></div>
                    <input
                      type="text"
                      value={formatVND(priceInput.to)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setPriceInput({ ...priceInput, to: raw });
                      }}
                      placeholder="₫ ĐẾN"
                    />
                  </div>
                  <button
                    className="btn-apply w-full mt-4"
                    onClick={() => {
                      const from = priceInput.from
                        ? Number(priceInput.from)
                        : null;
                      const to = priceInput.to ? Number(priceInput.to) : null;

                      updateSearchParams(searchParams, setSearchParams, {
                        from,
                        to,
                        page: 1,
                      });
                    }}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            </div>
            <ProductList
              categoryId={categoryId}
              selectedCategory={selectedCategory}
              fromPrice={fromPrice}
              toPrice={toPrice}
              cols={{ base: 2, md: 4 }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function formatVND(value) {
  if (!value) return "";

  const number = value.toString().replace(/\D/g, "");

  if (!number) return "";

  return new Intl.NumberFormat("vi-VN").format(Number(number));
}

function CategoryTree({ categories, activeId, onChangeCategory }) {
  const tree = buildCategoryTree(categories);
  const activePath = findActivePath(tree, activeId);

  return (
    <ul className="category-tree px-3 pb-[10px]">
      {tree.map((root) => (
        <CategoryItem
          key={root.id}
          category={root}
          activePath={activePath}
          onChangeCategory={onChangeCategory}
        />
      ))}
    </ul>
  );
}

function CategoryItem({ category, activePath, onChangeCategory }) {
  const inActivePath = activePath?.includes(category.id) || false;
  const hasChild = category.children && category.children.length > 0;
  const activeCategoryId = activePath?.[activePath.length - 1];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inActivePath) {
      setOpen(true);
    }
  }, [inActivePath]);

  return (
    <li className="category-item">
      <div className="category-row">
        <span
          className={inActivePath ? "cat-active" : ""}
          onClick={() => {
            if (activeCategoryId !== category.id) {
              onChangeCategory(category.id);
            }
          }}
        >
          {category.name}
        </span>

        {hasChild && (
          <ChevronDown
            size={16}
            className={`arrow ${open ? "rotate" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          />
        )}
      </div>

      {hasChild && (
        <div className={`category-children ${open ? "open" : ""}`}>
          <div className="inner">
            <ul>
              {category.children.map((child) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  activePath={activePath}
                  onChangeCategory={onChangeCategory}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

function findActivePath(tree, activeId) {
  for (const node of tree) {
    if (node.id === activeId) return [node.id];

    if (node.children?.length) {
      const sub = findActivePath(node.children, activeId);
      if (sub.length) return [node.id, ...sub];
    }
  }
  return [];
}

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

function ProductList({
  categoryId,
  selectedCategory,
  fromPrice,
  toPrice,
  limit = 12,
  cols = { base: 2, md: 4 },
}) {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "popular";
  const search = searchParams.get("search");

  const page = Number(searchParams.get("page")) || 1;

  const sortConfig = useMemo(() => {
    switch (sort) {
      case "price_asc":
        return { orderBy: "price", order: "asc" };

      case "price_desc":
        return { orderBy: "price", order: "desc" };

      case "bestSeller":
        return { orderBy: "sold", order: "desc" };

      case "newest":
        return { orderBy: "newest", order: "desc" };

      case "popular":
      default:
        return { orderBy: "rating", order: "desc" };
    }
  }, [sort]);

  useEffect(() => {
    setLoading(true);

    const from = typeof fromPrice === "number" ? fromPrice : undefined;
    const to = typeof toPrice === "number" ? toPrice : undefined;

    getProducts({
      page,
      limit,
      categoryId,
      search,
      fromPrice: from,
      toPrice: to,
      orderBy: sortConfig.orderBy,
      order: sortConfig.order,
    }).then((res) => {
      setProducts(res.data);
      setMeta(res.meta);
      setLoading(false);
    });
  }, [page, limit, categoryId, fromPrice, toPrice, sortConfig]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [products]);

  return (
    <section className={`product-list-section section-container`}>
      {loading && <div className="text-center py-6">Đang tải...</div>}

      <div className="container product-list-section__inner md:rounded-lg py-4">
        {selectedCategory?.description && (
          <p
            className="cat-description leading-relaxed text-sm text-gray-700"
            dangerouslySetInnerHTML={{
              __html: normalizeHtml(selectedCategory.description),
            }}
          />
        )}

        <div
          className={`sort-product flex items-center ${
            selectedCategory?.description ? "mt-[20px]" : ""
          }`}
        >
          <span className="sp-title">Sắp xếp theo</span>

          <button
            className={sort === "popular" ? "active" : ""}
            onClick={() =>
              updateSearchParams(searchParams, setSearchParams, {
                sort: "popular",
                page: 1,
              })
            }
          >
            Phổ biến
          </button>

          <button
            className={sort === "newest" ? "active" : ""}
            onClick={() =>
              updateSearchParams(searchParams, setSearchParams, {
                sort: "newest",
                page: 1,
              })
            }
          >
            Mới nhất
          </button>

          <button
            className={sort === "bestSeller" ? "active" : ""}
            onClick={() =>
              updateSearchParams(searchParams, setSearchParams, {
                sort: "bestSeller",
                page: 1,
              })
            }
          >
            Bán chạy
          </button>

          <div className="sort-dropdown">
            <button
              className={`sort-trigger ${
                sort.startsWith("price") ? "active" : ""
              }`}
            >
              <span>
                {sort === "price_asc"
                  ? "Giá: Thấp đến Cao"
                  : sort === "price_desc"
                    ? "Giá: Cao đến Thấp"
                    : "Giá"}
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  sort.startsWith("price") ? "rotate-180" : ""
                }`}
              />
            </button>

            <div className="sort-menu">
              <button
                className={sort === "price_asc" ? "active" : ""}
                onClick={() =>
                  updateSearchParams(searchParams, setSearchParams, {
                    sort: "price_asc",
                    page: 1,
                  })
                }
              >
                <span>Giá: Thấp đến Cao</span>
                {sort === "price_asc" && <i className="fa-solid fa-check" />}
              </button>

              <button
                className={sort === "price_desc" ? "active" : ""}
                onClick={() =>
                  updateSearchParams(searchParams, setSearchParams, {
                    sort: "price_desc",
                    page: 1,
                  })
                }
              >
                <span>Giá: Cao đến Thấp</span>
                {sort === "price_desc" && <i className="fa-solid fa-check" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`product-list mt-[24px] grid gap-4 md:gap-6 ${
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
                        ((regularPrice - salePrice) / regularPrice) * 100,
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
                            "Không thể thêm sản phẩm vào giỏ hàng",
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
      </div>

      {meta?.totalPages > 1 && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={(p) =>
            updateSearchParams(searchParams, setSearchParams, {
              page: p,
            })
          }
        />
      )}
    </section>
  );
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = getPagination({ page, totalPages });

  return (
    <div className="pagination">
      {/* First */}
      <button disabled={page === 1} onClick={() => onChange(1)}>
        «
      </button>

      {/* Prev */}
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ‹
      </button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-2">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={p === page ? "active" : ""}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        ›
      </button>

      {/* Last */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}

function getPagination({ page, totalPages, window = 2 }) {
  const pages = [];

  const start = Math.max(1, page - window);
  const end = Math.min(totalPages, page + window);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}

function findRootCategory(tree, activeId) {
  const path = findActivePath(tree, activeId);
  const rootId = path?.[0];
  if (!rootId) return null;

  return findCategoryById(tree, rootId);
}

function findCategoryById(categories, id) {
  for (const c of categories) {
    if (c.id === id) return c;
    if (c.children?.length) {
      const found = findCategoryById(c.children, id);
      if (found) return found;
    }
  }
  return null;
}

function normalizeHtml(html = "") {
  return html.replace(/\r?\n/g, "<br />");
}
