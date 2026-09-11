import { VscSignIn } from "react-icons/vsc";

const Login = () => {
  const handleLogin = () => {
    window.location.hash = "/dashboard";
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-3 text-sm font-medium text-gray-800 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 active:scale-[0.98] md:h-10 md:min-w-6 md:border md:border-gray-300"
    >
      <VscSignIn size={19} className="shrink-0 text-gray-700" />
    </button>
  );
};

export default Login;
