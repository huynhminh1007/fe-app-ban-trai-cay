import { fetchJson } from "./apiClient";
import { paginate } from "./paginate";

export async function getPosts({
  page = 1,
  limit = 10,
  categoryId,
  tagId,
  search,
} = {}) {
  let data = await fetchJson("posts.json");
  const tagMap = await getTagMap();

  if (categoryId) {
    data = data.filter((p) => p.categories?.includes(Number(categoryId)));
  }

  if (tagId) {
    data = data.filter((p) => p.tags?.includes(Number(tagId)));
  }

  if (search) {
    const key = search.toLowerCase();
    data = data.filter(
      (p) =>
        p.title?.toLowerCase().includes(key) ||
        p.content?.toLowerCase().includes(key),
    );
  }

  data = data.map((p) => ({
    ...p,
    tags: p.tags?.map((id) => tagMap[id]).filter(Boolean),
  }));

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return paginate(data, page, limit);
}

let _tagMap = null;

async function getTagMap() {
  if (_tagMap) return _tagMap;

  const tags = await fetchJson("post_tags.json");
  _tagMap = Object.fromEntries(tags.map((t) => [t.id, t]));
  return _tagMap;
}

export async function getPostById(id) {
  const data = await fetchJson("posts.json");
  const post = data.find((p) => String(p.id) === String(id));
  return post || null;
}

export function buildCategoryTree(categories) {
  const map = {};
  const roots = [];

  categories.forEach((cat) => {
    map[cat.id] = { ...cat, children: [] };
  });

  categories.forEach((cat) => {
    if (cat.parent === 0) {
      roots.push(map[cat.id]);
    } else if (map[cat.parent]) {
      map[cat.parent].children.push(map[cat.id]);
    }
  });

  return roots;
}
