import { useState } from "react";
import useProductView from "../../hooks/productView";
import useHandleClickOutisde from "../../hooks/handleClickOutside";
import {
  inVariantCartItemModel,
  variantCartItemModel,
} from "../../objects/cartItemModel";
import useCart from "../../hooks/cart";

function AddToCart() {
  const { invariantProductData, productData } = useProductView();
  const [quantity, setQuantity] = useState(1);

  const [showInput, setShowInput] = useState(false);
  const ref = useHandleClickOutisde(() => {
    setShowInput(false);
  });
  const { addItemToCart } = useCart();

  return (
    <>
      <div className="flex justify-between items-center p-2 h-min">
        <p>Quantity</p>
        <div className="flex items-stretch justify-center gap-[1px] self-stretch">
          <button
            disabled={quantity <= 1}
            className="bg-text-300 disabled:sr-only hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-3 font-bold text-xl"
            onClick={() => {
              setQuantity((old) => old - 1);
            }}
          >
            <svg
              width={16}
              height={4}
              viewBox="0 0 16 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99992 2.66671H13.9999C14.3681 2.66671 14.6666 2.36823 14.6666 2.00004C14.6666 1.63185 14.3681 1.33337 13.9999 1.33337H1.99992C1.63173 1.33337 1.33325 1.63185 1.33325 2.00004C1.33325 2.36823 1.63173 2.66671 1.99992 2.66671Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            className="bg-text-300 hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-4 py-[0.4rem] font-medium text-md"
            onDoubleClick={() => {
              setShowInput(true);
            }}
            ref={ref}
          >
            {showInput && (
              <input
                type="text"
                id="quantity-dialog"
                placeholder="Enter quantity"
                className="p-1 w-[30px] text-text-300"
                defaultValue={quantity}
                onKeyDown={(e) => {
                  // check for nan
                  if (
                    e.key === "Enter" &&
                    Number(e.target.value) === Number(e.target.value)
                  ) {
                    setQuantity(Number(e.target.value));
                    setShowInput(false);
                  } else if (e.key === "Escape") {
                    setShowInput(false);
                  }
                }}
              />
            )}
            {!showInput && quantity}
          </button>
          <button
            className="bg-text-300 hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-3 font-bold text-xl"
            onClick={() => {
              setQuantity((old) => old + 1);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.33325 7.33337V2.00004C7.33325 1.63185 7.63173 1.33337 7.99992 1.33337C8.36811 1.33337 8.66659 1.63185 8.66659 2.00004V7.33337H13.9999C14.3681 7.33337 14.6666 7.63185 14.6666 8.00004C14.6666 8.36823 14.3681 8.66671 13.9999 8.66671H8.66659V14C8.66659 14.3682 8.36811 14.6667 7.99992 14.6667C7.63173 14.6667 7.33325 14.3682 7.33325 14V8.66671H1.99992C1.63173 8.66671 1.33325 8.36823 1.33325 8.00004C1.33325 7.63185 1.63173 7.33337 1.99992 7.33337H7.33325Z"
                fill="white"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <button
        className="w-full bg-text-300 enabled:hover:bg-primary-200 py-4 px-6 transition-colors rounded-sm duration-150 font-medium text-white enabled:hover:text-text-300 "
        disabled={!invariantProductData.isSuccess && !productData.isSuccess}
        onClick={() => {
          let cartItem;
          if (productData.data.id) {
            cartItem = new variantCartItemModel({
              id: productData.data.id,
              qty: quantity,
            });
          } else {
            cartItem = new inVariantCartItemModel({
              uuid: invariantProductData.data.id,
              qty: quantity,
            });
          }
          addItemToCart({ cartItem: cartItem });
          setQuantity(1);
        }}
      >
        ADD TO CART
      </button>
    </>
  );
}

export default AddToCart;
