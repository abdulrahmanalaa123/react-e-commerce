import potPlant from "../../../assets/svgs/potPlant.svg";

function EmptyData() {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <img src={potPlant} alt="pot_plant_not_found" className="w-24 h-24" />
      <div className="text-center font-bold text-text-300">
        We cant find what You're Looking for :(
        <br />
        Please stay tuned and we're confident you will find it
      </div>
    </div>
  );
}

export default EmptyData;
