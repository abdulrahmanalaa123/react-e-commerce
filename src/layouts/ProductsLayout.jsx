import queryDecoder from "../utils/queryDecoder";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
function ProductsLayout() {
  //the problem now is it rerenders the whole component on the whole component and i want only the products component to rerender
  // but this is an issue to fix later

  console.log("rendered");

  return (
    <>
      <section id="search">
        <div>searchBar</div>
      </section>
      <section id="products-view" className="flex w-full h-full">
        <FilteringComponent></FilteringComponent>
      </section>
    </>
  );
}

export default ProductsLayout;
// {
//   /* <button
//           onClick={() => {
//             searchProducts({ searchparamKey: "tree" });
//             const queryParams = productsQueryGenerator();
//             console.log(queryDecoder({ searchParam: queryParams }));
//             console.log(params);
//           }}
//         >
//           GetParams
//         </button> */
// }
