import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";

async function deleteCartItem({ cartItem, cartId }) {
  const eqString = cartItem.product_id
    ? "product_id"
    : "product_combination_id";
  const postObject = { cart_id: cartId, ...cartItem };
  const { error } = await supabase
    .from("cart_items")
    .delete(postObject)
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

function useRemoveItemFromCart() {
  return useMutation({
    mutationFn: deleteCartItem,
    onMutate: (variables) => {
      const oldCart = useCartStore.getState().cartItems;
      // mbe toastify adding item to cart
      // optimistic newCart

      // TODO
      // need to update using this optimistic newCart Item and not just upsert with the addded quantity
      useCartStore.getState().deleteCartItem({ cartItem: variables.cartItem });

      return [...oldCart];
    },
    onSettled: (_data, error) => {
      // TODO toastify
      if (error) {
        // toastify Error occured
      } else {
        // toastify item removed from cart
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
}
export default useRemoveItemFromCart;
