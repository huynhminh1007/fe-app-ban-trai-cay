export function updateSearchParams(searchParams, setSearchParams, params) {
  const next = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
  });

  setSearchParams(next);
}
