export function paginate(array, page = 1, limit = 10) {
  const total = array.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: array.slice(start, end),
    meta: {
      total,
      totalPages,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}
