// done like this instead of changing my database and entering colors by their hex value which would be the better solution and querying them but to reduce loading
// as well as ease of coding for me ill use this method
const colorMapping = {
  Blue: "#024B5B",
  Green: "#387709",
  Purple: "#3B0088",
  Yellow: "#FFE500",
  Beige: "#FFEFA1",
  Red: "#EE1818",
};

function ColorCheckBox({ editSearchParams, name, paramKey, state = false }) {
  return (
    <div className="flex items-center">
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
        className="cursor-pointer w-6 h-6 rounded-full transition-all duration-75 inline-block outline outline-1 outline-[#00000040]  peer-focus-visible:outline-[3px] hover:outline-[3px] hover:outline-[#00000080] peer-focus-visible:outline-[#00000080] peer-checked:outline-[3px] peer-checked:outline-[#00000080]"
        style={{ backgroundColor: colorMapping[name] }}
      ></label>
    </div>
  );
}

export default ColorCheckBox;
