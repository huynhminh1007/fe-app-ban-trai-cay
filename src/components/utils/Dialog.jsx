import Swal from "sweetalert2";

export function showAddToCartToast() {
  return Swal.fire({
    text: "Sản phẩm đã được thêm vào Giỏ hàng",
    icon: "success",
    showConfirmButton: false,
    timer: 1200,
    backdrop: true,
    customClass: {
      popup: "swal-cart-popup",
      backdrop: "swal-cart-backdrop",
      htmlContainer: "swal-cart-text",
    },
  });
}

export function showCartErrorToast(message = "Có lỗi xảy ra") {
  return Swal.fire({
    text: message,
    icon: "error",
    confirmButtonText: "Đóng",
  });
}
