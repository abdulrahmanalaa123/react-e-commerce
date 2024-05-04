import queryDecoder from "../utils/queryDecoder";
import FilteringComponent from "../components/productsView/mainComponents/FilteringComponent";
import ProductsSection from "../components/productsView/mainComponents/ProductsSection";

function ProductsLayout() {
  //the problem now is it rerenders the whole component on the whole component and i want only the products component to rerender
  // but this is an issue to fix later

  console.log("rendered");

  return (
    <>
      <section id="search">
        <div>searchBar</div>
      </section>
      <section id="products-view" className="flex w-full h-full mb-14 gap-4">
        <FilteringComponent></FilteringComponent>
        <ProductsSection></ProductsSection>
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
