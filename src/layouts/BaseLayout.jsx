import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

import { useNavigation } from "react-router-dom";
import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import { Suspense } from "react";

function BaseLayout() {
  const navigation = useNavigation();
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-screen">
        <SuspenseLoader isAnimating={navigation.state === "loading"} />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default BaseLayout;
