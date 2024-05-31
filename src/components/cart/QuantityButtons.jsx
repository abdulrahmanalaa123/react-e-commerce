import { useState } from "react";
import useHandleClickOutisde from "../../hooks/handleClickOutside";
import { useRef } from "react";

function QuantityButtons({ quantity, updateFunc }) {
  const [showInput, setShowInput] = useState(false);
  const ref = useHandleClickOutisde(() => {
    setShowInput(false);
  });
  const inputRef = useRef(null);
  return (
    <div className="max-w-full flex items-stretch justify-center gap-[1px] ">
      <button
        disabled={quantity <= 1}
        className="bg-text-300 disabled:sr-only hover:bg-primary-200 text-white hover:text-text-300 duration-150 transition-colors px-3 font-bold text-xl"
        onClick={() => {
          updateFunc(quantity - 1);
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
        onClick={() => {
          if (showInput) {
            inputRef.current.focus({ focusVisible: true });
          }
        }}
        onDoubleClick={() => {
          setShowInput(true);
        }}
        ref={ref}
      >
        {showInput && (
          <input
            type="text"
            id="quantity-dialog"
            placeholder="qty"
            className="p-1 w-[30px] text-text-300 z-10"
            autoFocus={showInput}
            defaultValue={quantity}
            ref={inputRef}
            onKeyDown={(e) => {
              // check for nan
              if (
                e.key === "Enter" &&
                Number(e.target.value) === Number(e.target.value)
              ) {
                updateFunc(Number(e.target.value));
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
          updateFunc(quantity + 1);
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
  );
}

export default QuantityButtons;
