import Logo from "../../assets/svgs/logo.svg";
import ReusableButton from "../buttons/ReusableButton";

function Footer() {
  return (
    <section className="absolute left-0 mt-28 bg-backgrounds-footerBg p-6 right-0 flex flex-wrap gap-12 justify-center">
      <div className="flex sm:block sm:text-start flex-shrink basis-auto  text-center items-center flex-col">
        <img src={Logo} alt="footer-logo" />
        <p className="w-[27ch]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum.
        </p>
      </div>
      <div className="sr-only sm:not-sr-only flex flex-grow-[1] flex-shrink basis-auto justify-between ">
        <div>
          <p className="text-lg">Browse</p>
          <ul className="flex flex-col gap-3 mt-4">
            <li className="cursor-pointer hover:underline">Home</li>
            <li className="cursor-pointer hover:underline">Plants</li>
            <li className="cursor-pointer hover:underline">Garden Supplies</li>
            <li className="cursor-pointer hover:underline">Seeds</li>
            <li className="cursor-pointer hover:underline">Pots</li>
            <li className="cursor-pointer hover:underline">Help Center</li>
          </ul>
        </div>
        <div>
          <p className="text-lg">Contact</p>
          <ul className="flex flex-col gap-3 mt-4">
            <li>Alexandria, Egypt</li>
            <li>olivetree1513@email.com</li>
            <li>+958-423-2583</li>
          </ul>
        </div>
        <div>
          <p className="text-lg">Help Center</p>
          <ul className="flex flex-col gap-3 mt-4">
            <li className="cursor-pointer hover:underline">FAQ</li>
            <li className="cursor-pointer hover:underline">terms</li>
            <li className="cursor-pointer hover:underline">Report tickets</li>
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="flex-grow-[1]  flex-shrink basis-auto flex flex-col text-center items-center justify-center sm:block sm:text-start mb-3 sm:mb-0">
        <p className="text-lg mb-7">Share Your Thoughts?</p>
        <label htmlFor="thought">Opinion</label>
        <input
          type="text"
          name="thought"
          id="thought"
          placeholder="Enter Your Opinion"
          className="block mt-4 p-3 w-[60%] border border-[#DCDCE4] placeholder-[#666687] rounded-sm mb-4"
        />
        <div className="w-[60%]">
          <ReusableButton
            type={"submit"}
            onClick={() => {}}
            text={"Submit Your Opinion"}
          ></ReusableButton>
        </div>
      </div>
      <p className="absolute bottom-2  mx-auto">All Right Reserved @2024</p>
    </section>
  );
}

export default Footer;
