// the solution is really dumb and shouldnt use state managers in my opinion for this case since the state managed is by the search params hook
// https://medium.com/codex/handling-checkboxes-in-react-3a2514b140d2
function FilterCheckBox({
  editSearchParams,
  name,
  paramKey,
  initialCheck = false,
}) {
  return (
    <div className="my-9 flex items-center gap-4">
      <input
        type="checkbox"
        name={name}
        className="w-5 h-5 "
        defaultChecked={initialCheck}
        onChange={(e) => {
          editSearchParams(e, paramKey, name);
        }}
      />
      <span className="font-medium text-[20px]">Trees</span>
    </div>
  );
}

export default FilterCheckBox;
