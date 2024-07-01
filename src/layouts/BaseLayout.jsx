import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import Search from "../components/productsView/search/Search";

function BaseLayout() {
  return (
    <>
      <header>
        <Navbar />
        <section id="search" className="my-9">
          <Search />
        </section>
      </header>
      <main className="min-h-screen">
        <SuspenseLoader />
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default BaseLayout;
