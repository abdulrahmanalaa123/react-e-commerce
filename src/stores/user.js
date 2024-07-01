import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userData: null,
      cartId: null,

      setUserData: ({ metaData }) => {
        set((state) => ({
          userData: metaData,
          cartId: state.cartId,
        }));
      },
      deleteUserData: () => {
        set(() => ({
          userData: null,
          cartId: null,
        }));
      },
      setCartId: (id) => {
        set((state) => ({ userData: state.userData, cartId: id }));
      },
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
