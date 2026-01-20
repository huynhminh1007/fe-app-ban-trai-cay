export function getErrorMessage(error) {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  return "Đã có lỗi xảy ra";
}
