import Cart from "../../assets/svgs/cart.svg";
import useCartStore from "../../stores/cart";
function CartButton() {
  const cartLength = useCartStore((state) => state.cartItems.length);
  return (
    <button className="relative">
      {cartLength !== 0 && (
        <div className="w-4 h-4 absolute -top-[2px] -right-[4px] bg-error text-white text-[10px] flex items-center justify-center rounded-full">
          {cartLength}
        </div>
      )}
      <img src={Cart} alt="" />
    </button>
  );
}

export default CartButton;
