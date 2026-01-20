import Footer from "./Footer";
import Header from "./Header";
import "../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../service/auth.service";
import { getErrorMessage } from "../utils/apiHelper";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginService({ email, password });

      console.log("LOGIN SUCCESS:", user);

      // TODO: lưu user / token
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="auth-section">
        <div className="container section-container">
          <div className="border-b border-[#eee] pb-3 mb-6">
            <h1 className="text-lg text-[#212B25] font-medium mb-1">
              ĐĂNG NHẬP TÀI KHOẢN
            </h1>
            <p className="text-sm">
              Bạn chưa có tài khoản? Đăng ký{" "}
              <Link to="/register" className="underline text-blue-600">
                tại đây
              </Link>
            </p>
          </div>

          <form className="max-w-[500px] mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-2">
              <label className="block font-semibold mb-1">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                placeholder="Mật khẩu"
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4 text-sm">
              Quên mật khẩu? Nhấn vào{" "}
              <Link to="/forgot-password" className="text-blue-600">
                đây
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6BBE44] hover:bg-[#5aa83a] text-white font-semibold py-2 rounded mb-4"
            >
              Đăng nhập
            </button>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-[#E74C3C] text-white py-2 rounded font-semibold"
              >
                G+ Đăng nhập Google
              </button>

              <button
                type="button"
                className="flex-1 bg-[#3B5998] text-white py-2 rounded font-semibold"
              >
                Đăng nhập Facebook
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
