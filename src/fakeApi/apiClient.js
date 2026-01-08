export async function fetchJson(file) {
  const res = await fetch(`/data/${file}`);
  const data = await res.json();

  // giả delay backend
  await new Promise((r) => setTimeout(r, 400));
  return data;
}
