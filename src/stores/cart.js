import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import cartAddWithCollision from "../utils/cartAddWithCollision";
import cartRemoveItem from "../utils/cartRemoveItem";
import cartUpdateItem from "../utils/cartUpdateItem";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addCartItem: ({ cartItem }) => {
        set((state) => {
          return { cartItems: cartAddWithCollision(cartItem, state.cartItems) };
        });
      },
      updateCartItem: ({ cartItem }) => {
        set((state) => {
          return {
            cartItems: cartUpdateItem(cartItem, state.cartItems),
          };
        });
      },
      deleteCartItem: ({ cartItem }) => {
        set((state) => ({
          cartItems: cartRemoveItem(cartItem, state.cartItems),
        }));
      },
      setCartItems: (cartItems) => {
        set(() => ({
          cartItems: cartItems,
        }));
      },
      clearCartItems: () => {
        console.log("i happened");
        set(() => ({
          cartItems: [],
        }));
      },
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;
