// the solution is really dumb and shouldnt use state managers in my opinion for this case since the state managed is by the search params hook
// https://medium.com/codex/handling-checkboxes-in-react-3a2514b140d2
function SubCategoryCheckBox({
  editSearchParams,
  name,
  paramKey,
  initialCheck = false,
}) {
  return (
    <div className="flex items-center gap-[10px]">
      <input
        type="checkbox"
        id={`${paramKey}-${name}`}
        className="peer sr-only"
        defaultChecked={initialCheck}
        onChange={(e) => {
          editSearchParams(e, paramKey, name);
        }}
      />
      <label
        htmlFor={`${paramKey}-${name}`}
        className="w-5 h-5 rounded border transition-all duration-150 border-[#D0D5DD] p-1 text-text-300 cursor-pointer hover:shadow-[0px_0px_0px_4px_#EBE9FE] peer-focus-visible:border-text-300 
        peer-focus-visible:shadow-[0px_0px_0px_4px_#EBE9FE] peer-checked:bg-text-300 relative peer-checked:before:absolute  peer-checked:before:-top-1 peer-checked:before:content-[url('/src/assets/svgs/check.svg')] 
        peer-checked:before:w-full peer-checked:before:inline-block peer-checked:before:h-full "
      ></label>
      <span className="font-medium text-[20px]">{name}</span>
    </div>
  );
}

export default SubCategoryCheckBox;