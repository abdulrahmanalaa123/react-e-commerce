import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useFormStatus } from "../../../hooks/formStatus";
import { Link } from "react-router-dom";
import signUp from "../../../api/auth/signUp";

const validationSchema = object().shape({
  first_name: string().required("First Name is Required"),
  last_name: string().required("Last Name Is Required"),
  address: string(),
  email: string().email("Invalid Email").required("Email is required"),
  password: string().required("Password is required"),
});
function SignUpForm() {
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();
  //THIS status method using the hook isnt the best but reusable should try using the formik status method but fuck it will do it later and it goes like this
  // this is inside the onsubmit function in formik
  //if(error{
  // actions.setStatus(error.message)
  // }
  // and create a component that appears if there is a status
  // {status && <div>{status}</div>}
  //which will work better i think still need to test it later now i gotta do other stuff but the forms are working with an animation
  async function onSubmit(values) {
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
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        password: "",
      }}
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
            <p className="self-center text-xl mb-4">Sign Up</p>
            {status === "error" && <p className="text-error">{error}</p>}
            <ErrorMessage
              name="first_name"
              component="p"
              className="text-error"
            ></ErrorMessage>
            <Field
              name="first_name"
              placeholder="First Name"
              className="border-InputBorder border py-[10px] px-4 text-text-input"
            ></Field>
            <ErrorMessage
              name="last_name"
              component="p"
              className="text-error"
            ></ErrorMessage>
            <Field
              name="last_name"
              placeholder="Last Name"
              className="border-InputBorder border py-[10px] px-4 text-text-input"
            ></Field>
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
              name="address"
              component="p"
              className="text-error"
            ></ErrorMessage>
            <Field
              name="address"
              placeholder="Enter Your Address as detailed as possible"
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
              SignUp
            </button>
            <div className="self-center mt-4">
              <span>Have an account? </span>
              <Link
                to="/login"
                replace={true}
                className="text-primary-300 cursor-pointer hover:underline"
              >
                Log In
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SignUpForm;
