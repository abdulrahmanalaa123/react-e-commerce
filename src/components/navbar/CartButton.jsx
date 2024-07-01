import { Link } from "react-router-dom";
import Cart from "../../assets/svgs/cart.svg";
import useCartStore from "../../stores/cart";
function CartButton() {
  const cartItems = useCartStore((state) => state.cartItems);
  return (
    <Link className="relative flex-shrink-0" to="/cart">
      {cartItems.length !== 0 && (
        <div className="w-4 h-4 absolute -top-[2px] -right-[4px] bg-error text-white text-[10px] flex items-center justify-center rounded-full">
          {cartItems.length}
        </div>
      )}
      <img
        src={Cart}
        alt="cart-icon"
        className="w-full h-full object-contain"
      />
    </Link>
  );
}

export default CartButton;
