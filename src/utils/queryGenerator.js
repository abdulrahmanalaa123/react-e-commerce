import { createSearchParams } from "react-router-dom";

function productsQueryGenerator() {
  const queryObject = {
    subCategory: ["Indoor Plants", "Outdoor Plants"],
    color: ["red", "blue"],
    size: ["small,large"],
    priceRange: [100, 250],
    page: 2,
  };
  const queryParams = new URLSearchParams(queryObject);
  const reactQuerySearchParams = createSearchParams(queryObject);
  console.log(Object.entries(queryObject));
  console.log(queryParams.toString());
  console.log(reactQuerySearchParams.toString());

  reactQuerySearchParams.forEach((key, value) => {
    console.log(key, value);
  });

  return reactQuerySearchParams;
}

export default productsQueryGenerator;
