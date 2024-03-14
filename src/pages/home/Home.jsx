import React from "react";
import Hero from "./components/Hero";
import Banners from "./components/Banners";
import { supabase } from "../../lib/supabaseClient";
import userStore from "../../stores/user";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const [setUserData, userData] = userStore(
    useShallow((state) => [state.setUserData, state.userData])
  );

  async function testFunction() {
    // const { data: signUpData, error: signUpError } =
    //   await supabase.auth.signInWithPassword({
    //     email: "abdulrahmanalaa497@gmail.com",
    //     password: "3brazk2023",
    //   });
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signInWithPassword({
        email: "example@email.com",
        password: "example-password",
      });

    // if (signUpError) {
    //   console.error(signUpError);
    // } else {
    //   console.log(signUpData);
    // }

    // const { data, error } = await supabase.auth.signUp({
    //   email: "example@email.com",
    //   password: "example-password",
    //   options: {
    //     data: {
    //       first_name: "John",
    //       last_name: "Doe",
    //       address: "mahmodl",
    //       imageUrl: "https://picsum.photos/600",
    //     },
    //   },
    // });

    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    console.log(signUpData["user"]["user_metadata"]);
    setUserData({ metaData: signUpData["user"]["user_metadata"] });
    console.log(localStorage.getItem("token"));
    console.log(userData);
    // await supabase.auth.signOut();
    // deleteUserData();
  }
  return (
    <>
      <Hero />
      <button
        className="rounded-full px-4 py-1 bg-slate-400"
        onClick={() => {
          testFunction();
        }}
      >
        Testing
      </button>
      <Banners />
    </>
  );
}
