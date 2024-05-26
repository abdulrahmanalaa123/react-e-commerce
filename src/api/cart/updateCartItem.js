import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";

async function updateCartItem(cartItem, cartId) {
  const eqString = cartItem.product_id
    ? "product_id"
    : "product_combination_id";
  const postObject = { cart_id: cartId, ...cartItem };
  const { error } = await supabase
    .from("cart_items")
    .update(postObject)
    .eq("cart_id", cartId)
    .eq(
      eqString,
      cartItem.product_id
        ? cartItem.product_id
        : cartItem.product_combination_id
    );

  if (error) {
    throw error;
  }
}

export const useUpadteCartItem = () =>
  useMutation({
    mutationFn: updateCartItem,
    onMutate: (variables) => {
      const oldCart = useCartStore.getState().cartItems;
      // mbe toastify adding item to cart
      // optimistic newCart
      useCartStore.getState().updateCartItem({ cartItem: variables.cartItem });
      return [...oldCart];
    },
    onSettled: (_data, error) => {
      // TODO toastify
      if (error) {
        // toastify Error occured
      } else {
        // toastify item added to cart
      }
    },
    onError: (error, _variables, context) => {
      console.log(error);
      useCartStore.getState().setCartItems(context);
    },
    scope: {
      id: "cart",
    },
  });
export default useUpadteCartItem;
