function NamedBoxCheckBox({ editSearchParams, paramKey, name, state = false }) {
  return (
    <div className="mb-4">
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
        className="cursor-pointer p-2 text-center font-normal text-[#00000066] border border-[#00000066] rounded peer-checked:border-black peer-checked:text-black transition-colors duration-150"
      >
        {name}
      </label>
    </div>
  );
}

export default NamedBoxCheckBox;
