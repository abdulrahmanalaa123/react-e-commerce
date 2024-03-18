import ReactModal from "react-modal";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./modals.css";
import transparentLogo from "../../assets/svgs/transparentLogo.svg";
import { useFormStatus } from "../../hooks/formStatus";
import signIn from "../../api/auth/signIn";

const validationSchema = object().shape({
  email: string().email("Invalid Email").required("Email is required"),
  password: string().required("Password is required"),
});
export default function SignInModal({ isOpen, toggleOpen }) {
  const { status, setStatus, error, setErrorMsg, clearError, resetHook } =
    useFormStatus();

  async function onSubmit(values) {
    const { error } = await signIn(values);
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      resetHook();
    }
  }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        toggleOpen();
        resetHook();
      }}
      overlayClassName="overlay"
      className="modal"
    >
      <img src={transparentLogo} alt="" />

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col gap-2 w-full justify-self-end h-full">
              <p>Join Us</p>
              {status === "error" && <p className="text-error">{error}</p>}
              <ErrorMessage
                name="email"
                component="p"
                className="text-error "
              ></ErrorMessage>
              <Field
                name="email"
                placeholder="Enter Your Email"
                className="inputStyle"
              ></Field>
              <ErrorMessage
                name="password"
                component="p"
                className="text-error "
              ></ErrorMessage>
              <Field
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="inputStyle"
              ></Field>
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end px-6 py-4 disabled:bg-text-200 bg-text-300 text-white w-1/2"
              >
                SignIn
              </button>
            </Form>
          );
        }}
      </Formik>
    </ReactModal>
  );
}
