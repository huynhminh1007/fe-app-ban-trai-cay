export function formatVND(value) {
  if (value == null) return "";
  return new Intl.NumberFormat("vi-VN").format(value) + "₫";
}
