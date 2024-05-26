import { useShallow } from "zustand/react/shallow";
import useCartStore from "../stores/cart";
import useUserStore from "../stores/user";
import useAddItemToCart from "../api/cart/addCartItem";
import { useUpadteCartItem } from "../api/cart/updateCartItem";

function useCart() {
  const cartId = useUserStore((state) => state.cartId);
  const { addCartItem, updateCartItem, deleteCartItem, cartItems } =
    useCartStore(
      useShallow((state) => ({
        cartItems: state.cartItems,
        addCartItem: state.addCartItem,
        updateCartItem: state.updateCartItem,
        deleteCartItem: state.deleteCartItem,
      }))
    );
  const addCartMutation = useAddItemToCart();
  const updateCartMutation = useUpadteCartItem();

  function addItemToCart({ cartItem }) {
    console.log(cartItem.constructor.name);
    if (cartId) {
      addCartMutation.mutate({ cartId: cartId, cartItem: cartItem });
    } else {
      addCartItem({ cartItem: cartItem });
    }
  }

  function updateItem({ cartItem }) {
    if (cartId) {
      updateCartMutation.mutate({ cartId: cartId, cartItem: cartItem });
    } else {
      updateCartItem({ cartItem: cartItem });
    }
  }

  return { addItemToCart, updateItem };
}

export default useCart;
