import { VscSignIn } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex md:h-10 md:min-w-32 cursor-pointer items-center justify-center gap-2 rounded-lg md:border md:border-gray-300 bg-white px-4 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98]"
    >
      <VscSignIn size={19} className="shrink-0 text-gray-700" />
      <span className="hidden md:block">ورود</span>
    </button>
  );
};

export default Login;
