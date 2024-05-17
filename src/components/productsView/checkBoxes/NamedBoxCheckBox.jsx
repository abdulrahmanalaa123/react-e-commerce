import { memo } from "react";

function NamedBoxCheckBox({ editSearchParams, paramKey, name, state = false }) {
  return (
    <div className=" flex place-content-center place-items-center">
      <input
        type="checkbox"
        id={`${paramKey}-${name}`}
        checked={state}
        className="sr-only peer"
        onChange={(e) => {
          editSearchParams(e, paramKey, name);
        }}
      />
      <label
        htmlFor={`${paramKey}-${name}`}
        className="cursor-pointer p-2 text-center font-normal text-buttons-unhoveredProductButtons border border-buttons-unhoveredProductButtons rounded peer-focus-visible:border-black peer-focus-visible:text-black peer-checked:border-black peer-checked:text-black transition-colors duration-150 hover:border-black hover:text-black"
      >
        {name}
      </label>
    </div>
  );
}

export default memo(NamedBoxCheckBox);
