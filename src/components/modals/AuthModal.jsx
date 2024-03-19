import ReactModal from "react-modal";
import "./modals.css";
import transparentLogo from "../../assets/svgs/transparentLogo.svg";
import { useFormStatus } from "../../hooks/formStatus";
import signIn from "../../api/auth/signIn";
import SignInForm from "../forms/SignInForm";
import { useState } from "react";
import SignUpForm from "../forms/SignUpForm";
import signUp from "../../api/auth/signUp";

ReactModal.setAppElement("body");
export default function AuthModal({ isOpen, toggleOpen }) {
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();
  const [signingUp, setSigningUp] = useState(false);

  function toggleForm() {
    setSigningUp(!signingUp);

    if (status) {
      resetHook();
    }
  }
  async function signInSubmit(values) {
    const { error } = await signIn(values);

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      if (status) {
        resetHook();
      }
    }
  }
  async function signUpSubmit(values) {
    const credentials = { email: values.email, password: values.password };
    const options = {
      address: values.address,
      first_name: values.first_name,
      last_name: values.last_name,
    };
    const { error } = await signUp({ credentials, options });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      if (status) {
        resetHook();
      }
    }
  }

  //THIS status method using the hook isnt the best but reusable should try using the formik status method but fuck it will do it later and it goes like this
  // this is inside the onsubmit function in formik
  //if(error{
  // actions.setStatus(error.message)
  // }
  // and create a component that appears if there is a status
  // {status && <div>{status}</div>}
  //which will work better i think still need to test it later now i gotta do other stuff but the forms are working with an animation
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        toggleOpen();
      }}
      overlayClassName="fixed backdrop-blur-[3px] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.7)] z-50 appearAnimation"
      className={`absolute m-auto left-0 right-0 top-0 bottom-0 bg-[#FBFFF9] px-6 py-4 flex flex-col max-w-[430px] min-h-[570px] max-h-max w-full justify-items-center items-center opacity-0 shadow-[3px_1px_18px_#0003] ${
        isOpen ? "appearAnimation" : "disappearAnimation"
      }`}
      onAfterClose={() => {
        if (status) {
          resetHook();
        }
      }}
      closeTimeoutMS={200}
    >
      <img src={transparentLogo} alt="" />
      {signingUp ? (
        <SignUpForm
          onSubmit={signUpSubmit}
          status={status}
          error={error}
          toggleForm={toggleForm}
        ></SignUpForm>
      ) : (
        <SignInForm
          onSubmit={signInSubmit}
          status={status}
          error={error}
          toggleForm={toggleForm}
        ></SignInForm>
      )}
    </ReactModal>
  );
}
