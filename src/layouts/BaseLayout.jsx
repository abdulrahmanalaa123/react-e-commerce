import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";

import SuspenseLoader from "../components/SuspenseLoader/SuspenseLoader";
import Search from "../components/productsView/search/Search";

function BaseLayout() {
  console.log("rerender");
  return (
    <>
      <header>
        <Navbar />
        <section id="search" className="my-9">
          <Search />
          <button
            onClick={async () => {
              console.log("need you later");
            }}
          >
            Test Button
          </button>
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
