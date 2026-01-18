import { fetchJson } from "./apiClient";
import { paginate } from "./paginate";

export function buildCategoryTree(categories) {
  const map = {};
  const roots = [];

  categories.forEach((c) => {
    map[c.id] = { ...c, children: [] };
  });

  categories.forEach((c) => {
    if (c.parent === 0) {
      roots.push(map[c.id]);
    } else if (map[c.parent]) {
      map[c.parent].children.push(map[c.id]);
    }
  });

  return roots;
}

export function getAllChildren(tree, parentId) {
  const ids = [];

  function collect(node) {
    ids.push(node.id);
    node.children?.forEach(collect);
  }

  function dfs(nodes) {
    for (const n of nodes) {
      if (n.id === parentId) {
        collect(n);
        return true;
      }
      if (n.children?.length && dfs(n.children)) return true;
    }
    return false;
  }

  dfs(tree);
  return ids;
}

export async function getProductById(id) {
  const data = await fetchJson("products.json");

  const product = data.find((p) => String(p.id) === String(id));

  return product || null;
}

export async function getProducts({
  page = 1,
  limit = 12,
  categoryId,
  search,
  orderBy,
  order = "desc",
  fromPrice,
  toPrice,
  onSale,
} = {}) {
  let products = await fetchJson("products.json");
  const categories = await fetchJson("categories.json");

  const categoryTree = buildCategoryTree(categories);

  if (categoryId) {
    const ids = getAllChildren(categoryTree, Number(categoryId));

    products = products.filter((p) =>
      p.categories?.some((c) => ids.includes(c.id)),
    );
  }

  if (onSale !== undefined) {
    products = products.filter((p) => p.on_sale === onSale);
  }

  if (search) {
    const key = search.toLowerCase();

    products = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(key) ||
        p.categories?.some((c) => c.name?.toLowerCase().includes(key)) ||
        p.tags?.some((t) => t.name?.toLowerCase().includes(key)),
    );
  }

  if (typeof fromPrice === "number" || typeof toPrice === "number") {
    products = products.filter((p) => {
      const price = Number(p.prices?.price || 0);
      if (typeof fromPrice === "number" && price < fromPrice) return false;
      if (typeof toPrice === "number" && price > toPrice) return false;
      return true;
    });
  }

  if (orderBy) {
    products.sort((a, b) => {
      let A = 0;
      let B = 0;

      switch (orderBy) {
        case "price":
          A = Number(a.prices?.price || 0);
          B = Number(b.prices?.price || 0);
          break;

        case "sold":
          A = a.totalSold || 0;
          B = b.totalSold || 0;
          break;

        case "rating":
          A = Number(a.average_rating || 0);
          B = Number(b.average_rating || 0);
          break;

        case "newest":
          A = a.id;
          B = b.id;
          break;

        default:
          A = a[orderBy];
          B = b[orderBy];
      }

      return order === "asc" ? A - B : B - A;
    });
  }

  return paginate(products, page, limit);
}
