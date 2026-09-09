import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const cartCount = 0;

  return (
    <button
      type="button"
      className="relative flex shrink-0 cursor-pointer items-center gap-2 text-gray-700 transition hover:text-blue-600"
    >
      <div className="relative">
        <FiShoppingCart className="text-2xl" />

        {cartCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </div>

      {/* <span className="hidden text-sm font-medium md:block">سبد خرید</span> */}
    </button>
  );
};

export default Cart;
