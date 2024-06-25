import { useLocation } from "react-router-dom";
function OrderSummary() {
  const location = useLocation();
  return (
    <section className="col-span-5 md:col-span-2 h-min bg-backgrounds-cardsBg px-5 py-4 md:mb-0 mb-20">
      <div className="flex flex-col gap-4 justify-start items-center w-full h-full">
        <p className="text-md font-semibold p-3">Order Summary</p>
        <div className="flex flex-col gap-5 items-stretch w-full">
          <p className="font-medium text-md pl-3">Product</p>
          {location.state.map((item, index) => (
            <div className="flex justify-between pr-11 pl-3" key={index}>
              <p>
                {item.name}
                <b>{` x${item.qty}`}</b>
              </p>
              <p>{`${(item.qty * item.price).toFixed(2)}$`}</p>
            </div>
          ))}

          <div className="flex justify-between pr-11 pl-3 border-t border-t-text-300 pt-4">
            <p className="font-medium text-md">Subtotal</p>
            <p>
              {`${location.state
                .reduce((accum, item) => accum + item.qty * item.price, 0)
                .toFixed(2)}$`}
            </p>
          </div>
          <div className="flex justify-between  pr-11 pl-3">
            <p className="font-medium text-md">Shipping</p>
            <p className="mr-4">-</p>
          </div>
          <div className="flex justify-between pr-11 pl-3 border-t border-t-text-300 pt-4">
            <p className="font-medium text-md">Total</p>
            <p>
              {`${location.state
                .reduce((accum, item) => accum + item.qty * item.price, 0)
                .toFixed(2)}$`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OrderSummary;
