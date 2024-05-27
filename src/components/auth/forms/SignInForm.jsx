import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useFormStatus } from "../../../hooks/formStatus";
import { Link } from "react-router-dom";
import signIn from "../../../api/auth/signIn";
const validationSchema = object().shape({
  email: string().email("Invalid Email").required("Email is required"),
  password: string().required("Password is required"),
});
function SignInForm() {
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();

  async function onSubmit(values) {
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
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        await onSubmit(values);
        actions.setSubmitting(false);
      }}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ isSubmitting }) => {
        return (
          <Form className="flex flex-col gap-2 w-full justify-self-end h-full">
            <p className="self-center text-xl mb-4">Sign In</p>
            {status === "error" && <p className="text-error">{error}</p>}
            <ErrorMessage
              name="email"
              component="p"
              className="text-error"
            ></ErrorMessage>
            <Field
              name="email"
              placeholder="Enter Your Email"
              className="border-InputBorder border py-[10px] px-4 text-text-input"
            ></Field>
            <ErrorMessage
              name="password"
              component="p"
              className="text-error"
            ></ErrorMessage>
            <Field
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="border-InputBorder border py-[10px] px-4 text-text-input"
            ></Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-4 disabled:bg-text-200 bg-text-300 text-white w-full mt-8 hover:bg-primary-200 transition-colors duration-150 hover:text-black"
            >
              SignIn
            </button>
            <div className="self-center mt-4">
              <span>No Account? </span>
              <Link
                to="/register"
                replace={true}
                className="text-primary-300 cursor-pointer hover:underline"
              >
                Create One
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignInForm;
