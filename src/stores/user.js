import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set, get) => ({
      userData: null,

      setUserData: ({ metaData }) => {
        console.log("metadata is:", metaData);
        set(() => ({
          userData: metaData,
        }));
      },
      deleteUserData: () => {
        if (get().userData) {
          console.log("deleting token");
          set(() => ({
            userData: null,
          }));
        }
      },
    }),
    { name: "user-store" }
  )
);

export default userStore;
