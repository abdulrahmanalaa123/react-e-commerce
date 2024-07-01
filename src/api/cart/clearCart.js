import { useMutation } from "@tanstack/react-query";
import useCartStore from "../../stores/cart";
import { supabase } from "../../lib/supabaseClient";

async function clearCart(cartId) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }
}

export const useClearcart = () =>
  useMutation({
    mutationFn: clearCart,
    onMutate: () => {
      const oldCart = useCartStore.getState().cartItems;
      useCartStore.getState().clearCartItems();

      return oldCart;
    },
    onError: (error, _variables, context) => {
      useCartStore.getState().setCartItems(context);
    },
    scope: {
      id: "cart",
    },
  });
export default clearCart;
