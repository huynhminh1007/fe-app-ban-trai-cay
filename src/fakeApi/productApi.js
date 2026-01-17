import { fetchJson } from "./apiClient";
import { paginate } from "./paginate";

function buildCategoryTree(products) {
  const map = {};

  products.forEach((p) => {
    p.categories?.forEach((c) => {
      if (!map[c.id]) map[c.id] = [];
      if (c.parent && c.parent !== 0) {
        if (!map[c.parent]) map[c.parent] = [];
        map[c.parent].push(c.id);
      }
    });
  });

  return map;
}

function getAllChildren(map, parentId) {
  const result = new Set([parentId]);
  const stack = [parentId];

  while (stack.length) {
    const id = stack.pop();
    (map[id] || []).forEach((child) => {
      if (!result.has(child)) {
        result.add(child);
        stack.push(child);
      }
    });
  }

  return Array.from(result);
}

export async function getProductById(id) {
  const data = await fetchJson("products.json");

  const product = data.find((p) => String(p.id) === String(id));

  return product || null;
}

export async function getProducts({
  page = 1,
  limit = 10,
  categoryId,
  search,
  orderBy,
  order = "desc",
  onSale,
} = {}) {
  let data = await fetchJson("products.json");
  const catTree = buildCategoryTree(data);

  if (categoryId) {
    const ids = getAllChildren(catTree, Number(categoryId));
    data = data.filter((p) => p.categories?.some((c) => ids.includes(c.id)));
  }

  if (onSale !== undefined) {
    data = data.filter((p) => p.on_sale === onSale);
  }

  if (search) {
    const key = search.toLowerCase();

    data = data.filter(
      (p) =>
        p.name?.toLowerCase().includes(key) ||
        p.categories?.some((c) => c.name.toLowerCase().includes(key)) ||
        p.tags?.some((t) => t.name.toLowerCase().includes(key))
    );
  }

  if (orderBy) {
    data.sort((a, b) => {
      let A, B;

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

  return paginate(data, page, limit);
}
