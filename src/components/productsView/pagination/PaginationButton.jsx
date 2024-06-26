function PaginationButton({ val, active, onClick }) {
  return (
    // fixed the UI bug by not assigning any properties if its not active and abide by the tailwind properties
    <button
      className="py-2 px-6 hover:bg-text-300 font-bold hover:text-white text-black rounded-sm"
      style={{
        backgroundColor: active ? "#232323" : "",
        color: active ? "rgb(255 255 255)" : "",
      }}
      onClick={onClick}
    >
      {val}
    </button>
  );
}

export default PaginationButton;
