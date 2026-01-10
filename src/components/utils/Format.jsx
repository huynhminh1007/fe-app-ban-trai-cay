export function formatVND(value) {
  if (value == null || value === "") return "";

  const number = Number(value.toString().replace(/\./g, "").replace(/,/g, ""));

  return new Intl.NumberFormat("vi-VN").format(number) + "₫";
}
