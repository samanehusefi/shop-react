import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const cartCount = 0;

  return (
    <button
      type="button"
      className="relative mr-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition-colors duration-200 hover:bg-gray-100"
    >
      <FiShoppingCart className="text-xl leading-none" />

      {cartCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default Cart;
