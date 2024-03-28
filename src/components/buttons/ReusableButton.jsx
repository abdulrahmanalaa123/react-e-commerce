function ReusableButton({ type, onClick, text }) {
  return (
    <button
      type={type ?? "button"}
      className="px-6 py-4 disabled:bg-text-200 bg-text-300 text-white hover:bg-primary-200 transition-colors duration-150 hover:text-text-300 w-64 max-w-full rounded-sm"
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
}

export default ReusableButton;
