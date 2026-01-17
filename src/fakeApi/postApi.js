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
        p.content?.toLowerCase().includes(key)
    );
  }

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  return paginate(data, page, limit);
}

export async function getPostById(id) {
  const data = await fetchJson("posts.json");
  const post = data.find((p) => String(p.id) === String(id));
  return post || null;
}
