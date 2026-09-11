import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard", { replace: true });
      return;
    }

    setError("نام کاربری یا رمز عبور اشتباه است");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md justify-center rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-wrap justify-center">
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/logo/full-horizontal.svg`}
            alt="دیجیکالا"
            className="mb-3 h-5 w-auto object-contain md:h-6"
          />

          <p className="mb-2 w-full text-center text-sm text-gray-700">
            ورود به پنل مدیریت
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">نام کاربری</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-300 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">رمز عبور</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-300 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-0"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
