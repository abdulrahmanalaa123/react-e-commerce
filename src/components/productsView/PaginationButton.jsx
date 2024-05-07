function PaginationButton({ val, active, onclick = () => {} }) {
  return (
    <button
      className="py-2 px-6 hover:bg-text-300 font-bold hover:text-white text-black rounded-sm"
      style={{
        backgroundColor: active ? "#232323" : "none",
        color: active ? "#FFFFFF" : "#000000",
      }}
      onClick={onclick}
    >
      {val}
    </button>
  );
}

export default PaginationButton;
