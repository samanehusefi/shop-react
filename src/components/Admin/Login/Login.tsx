import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (username.trim().length < 3) {
      newErrors.username = "نام کاربری باید حداقل ۳ کاراکتر باشد";
    }

    if (!password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (password.length < 4) {
      newErrors.password = "رمز عبور باید حداقل ۴ کاراکتر باشد";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (username.trim() === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard", { replace: true });
      return;
    }

    setErrors({
      general: "نام کاربری یا رمز عبور اشتباه است",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-7 flex flex-wrap justify-center">
          <Link to="/" title="صفحه اصلی">
            <img
              loading="lazy"
              src={`${import.meta.env.BASE_URL}assets/logo/full-horizontal.svg`}
              alt="دیجیکالا"
              className="mb-3 h-5 w-auto object-contain md:h-6"
            />
          </Link>

          <p className="w-full text-center text-sm text-gray-700">
            ورود به پنل مدیریت
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          <div>
            <label className="mb-2 block text-sm font-medium">نام کاربری</label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  username: undefined,
                  general: undefined,
                }));
              }}
              placeholder="نام کاربری"
              className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-800 placeholder:text-gray-300 focus:bg-white focus:outline-none focus:ring-0 ${
                errors.username
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
            />

            {errors.username && (
              <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">رمز عبور</label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: undefined,
                  general: undefined,
                }));
              }}
              placeholder="رمز عبور"
              className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-800 placeholder:text-gray-300 focus:bg-white focus:outline-none focus:ring-0 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-red-600"
              }`}
            />

            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

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
