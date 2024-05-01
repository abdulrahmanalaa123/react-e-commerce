import { Outlet, useLocation, useParams } from "react-router-dom";

function ProductsLayout() {
  const params = useParams();
  const location = useLocation();
  return (
    <>
      <section id="search">
        <div>searchBar</div>
      </section>
      <section>
        <div>{location.pathname}</div>
        <button
          onClick={() => {
            console.log(params);
          }}
        >
          GetParams
        </button>
      </section>
    </>
  );
}

export default ProductsLayout;
