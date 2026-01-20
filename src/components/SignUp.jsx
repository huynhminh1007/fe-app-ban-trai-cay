import Footer from "./Footer";
import Header from "./Header";
import "../styles/auth.scss";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <>
      <Header />

      <div className="auth-section">
        <div className="container section-container">
          <div className="border-b border-[#eee] pb-3 mb-6">
            <h1 className="text-lg text-[#212B25] font-medium mb-1">
              ĐĂNG KÝ TÀI KHOẢN
            </h1>
            <p className="text-sm">
              Bạn đã có tài khoản? Đăng nhập{" "}
              <Link to="/login" className="underline text-blue-600">
                tại đây
              </Link>
            </p>
          </div>

          <form className="max-w-[500px] mx-auto">
            <h2 className="text-center font-bold text-lg">Thông tin cá nhân</h2>

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full bg-[#6BBE44] hover:bg-[#5aa83a] text-white font-semibold py-2 rounded mb-4"
            >
              Đăng ký
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-[#E74C3C] text-white py-2 rounded font-semibold"
              >
                G+ Đăng ký Google
              </button>

              <button
                type="button"
                className="flex-1 bg-[#3B5998] text-white py-2 rounded font-semibold"
              >
                Đăng ký Facebook
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
