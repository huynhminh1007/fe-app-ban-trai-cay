import "../styles/product_list_page.scss";
import Header from "./Header";
import { buildCategoryTree, getCategories } from "../fakeApi/postCategoryApi";
import { ChevronDown, Link2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getPosts } from "../fakeApi/postApi";
import Footer from "./Footer";
import "../styles/product_list.scss";
import ProductLink from "./navigation/ProductLink";
import { updateQuantity } from "../fakeApi/cartApi";
import { showAddToCartToast, showCartErrorToast } from "./utils/Dialog";
import { Link, useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../utils/updateSearchParams";

export default function PostListPage() {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category")
    ? Number(searchParams.get("category"))
    : null;

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
            <div className="sticky top-24 self-start">
              <div className="plp_item bg-white border border-gray-300 overflow-hidden">
                <h3 className="item__title">Chuyên mục</h3>
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
            </div>
            <PostList
              categoryId={categoryId}
              selectedCategory={selectedCategory}
              cols={{ base: 1, md: 1 }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
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
        {/* CLICK TEXT → FILTER */}
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

        {/* CLICK ARROW → TOGGLE */}
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

function PostList({
  categoryId,
  selectedCategory,
  search,
  limit = 5,
  cols = { base: 1, md: 1 },
}) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setLoading(true);

    getPosts({
      page,
      limit,
      categoryId,
    }).then((res) => {
      setPosts(res.data);
      setMeta(res.meta);
      setLoading(false);
      console.log(res.data);
    });
  }, [page, limit, categoryId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [posts]);

  return (
    <section className={`product-list-section section-container`}>
      {loading && <div className="text-center py-6">Đang tải...</div>}

      <div className="container product-list-section__inner md:rounded-lg py-4">
        <ul className="grid grid-cols-1 gap-6">
          {posts.map((p) => (
            <PostItem key={p.id} post={p} />
          ))}
        </ul>
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

function PostItem({ post }) {
  return (
    <li className="post-card">
      <div className="grid grod-cols-1 md:grid-cols-[3fr_7fr] gap-4">
        <img src={post.thumbnail} alt={post.title} />
        <div>
          <h2 className="post-card__title text-lg leading-relaxed">
            <Link to={"/posts/" + post.id}>{post.title}</Link>
          </h2>
          <p
            className="leading-relaxed text-sm text-gray-700 text-base mt-3"
            dangerouslySetInnerHTML={{
              __html: normalizeHtml(post.excerpt),
            }}
          />
        </div>
      </div>
      <div className="mt-3 text-xs">
        <i className="fa-solid fa-tag mr-1"></i>

        {post.tags.map((tag, index) => (
          <span key={tag.id}>
            <Link to={`/tag/${tag.slug}`} className="post-tag">
              {tag.name}
            </Link>

            {index < post.tags.length - 1 && (
              <span className="text-black">, </span>
            )}
          </span>
        ))}
      </div>

      <div className="post-divider">
        <span className="line"></span>
        <Link to={`/posts/${post.id}`} className="view-more">
          Xem thêm...
        </Link>
      </div>
    </li>
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
