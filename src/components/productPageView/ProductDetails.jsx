import useProductView from "../../hooks/productView";
import LoadingLine from "./LoadingLine";

function ProductDetails({ children }) {
  const { invariantProductData, productData } = useProductView();

  return (
    <>
      {invariantProductData.isSuccess ? (
        <p className="font-medium text-md p-2">
          {invariantProductData.data.name}
        </p>
      ) : (
        <LoadingLine />
      )}
      {/* will only load due on the invariantProductData due to the keepPrevious query configuration */}
      {productData.isSuccess && invariantProductData.isSuccess ? (
        <p className="font-medium text-md p-2">{`${
          productData.data.price ?? invariantProductData.data.price
        }.00$`}</p>
      ) : (
        <LoadingLine />
      )}
      {children}
      {invariantProductData.isSuccess ? (
        <div className="flex justify-between items-center p-2">
          <p>Category</p>
          <p className="font-medium text-md">
            {invariantProductData.data.category}
          </p>
        </div>
      ) : (
        <LoadingLine />
      )}
    </>
  );
}

export default ProductDetails;
