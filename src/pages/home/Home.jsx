import React from "react";
import Hero from "../../components/home/Hero";
import Banners from "../../components/home/Banners";
import userStore from "../../stores/user";
import signIn from "../../api/auth/signIn";
import signUp from "../../api/auth/signUp";
import signOut from "../../api/auth/signOut";
import getUser from "../../api/user/getUser";

export default function Home() {
  const userData = userStore((state) => state.userData);

  async function testFunction() {
    // await signIn({ email: "example@email.com", password: "example-password" });
    // await signUp({
    //   credentials: { email: "example@email.com", password: "example-password" },
    // });
    // await signOut();
    await getUser();
  }
  return (
    <div>
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
    </div>
  );
}
