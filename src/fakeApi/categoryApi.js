import { fetchJson } from "./apiClient";
import { paginate } from "./paginate";

function buildTree(list) {
  const map = {};
  const roots = [];

  list.forEach((c) => {
    map[c.id] = { ...c, children: [] };
  });

  list.forEach((c) => {
    const parent = Number(c.parent);
    if (parent === 0) roots.push(map[c.id]);
    else map[parent]?.children.push(map[c.id]);
  });

  return roots;
}

export async function getCategories({ page = 1, limit = 10 } = {}) {
  const data = await fetchJson("categories.json");
  return paginate(data, page, limit);
}

function mapForMenu(tree, maxLv2 = 6, maxLv3 = 6) {
  return tree.map((root) => ({
    id: root.slug,
    label: root.name,
    icon: "fa-apple-whole",
    subs: root.children.length
      ? root.children.slice(0, maxLv2).map((lv2) => ({
          id: lv2.slug,
          label: lv2.name,
          children: [
            ...lv2.children.slice(0, maxLv3).map((lv3) => lv3.name),
            ...(lv2.children.length > maxLv3 ? ["..."] : []),
          ],
        }))
      : null,
  }));
}

export async function getCategoryForMenu() {
  const data = await fetchJson("categories.json");
  const tree = buildTree(data);
  return mapForMenu(tree);
}
