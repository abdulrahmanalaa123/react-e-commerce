import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";

export async function bulkAddCartItems({ cartId, cartItems }) {
  let { error } = await supabase.rpc("upsert_cart_items", {
    cart_id: cartId,
    items: cartItems,
  });
  if (error) {
    throw error;
  }
}

function useBulkAddItemsToCart() {
  return useMutation({
    mutationFn: bulkAddCartItems,
    onMutate: (variables) => {
      const oldCart = useCartStore.getState().cartItems;
      const addCartItem = useCartStore.getState().addCartItem;
      // mbe toastify adding item to cart
      // optimistic newCart
      variables.cartItems.forEach((item) => addCartItem({ cartItem: item }));
      return [...oldCart];
    },
    // onSettled: (data, error) => {
    //   // TODO toastify
    //   if (error) {
    //     // toastify Error occured
    //   } else {
    //     // toastify item added to cart
    //   }
    // },
    onError: (error, variables, context) => {
      useCartStore.getState().setCartItems(context);
    },

    scope: {
      id: "cart",
    },
  });
}
export default useBulkAddItemsToCart;
