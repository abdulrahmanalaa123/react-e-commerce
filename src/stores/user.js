import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      userData: null,
      cartId: null,

      setUserData: ({ metaData }) => {
        console.log("metadata is:", metaData);
        set((state) => ({
          userData: metaData,
          cartId: state.cartId,
        }));
      },
      deleteUserData: () => {
        if (get().userData) {
          console.log("deleting token");
          set(() => ({
            userData: null,
            cartId: null,
          }));
        }
      },
      setCartId: (id) => {
        set((state) => ({ userData: state.userData, cartId: id }));
      },
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
