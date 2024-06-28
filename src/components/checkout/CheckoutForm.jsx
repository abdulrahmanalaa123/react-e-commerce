import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useCheckout from "../../hooks/checkout";
import PaymentField from "./PaymentField";
const PHONE_REGEXP =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const CHECKOUT_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Name too short")
    .max(20, "Cant have a name Longer than 20 characters")
    .required("First Name Required"),
  lastName: Yup.string()
    .min(2, "Name too short")
    .max(20, "Cant have a name Longer than 20 characters")
    .required("Last Name Required"),
  email: Yup.string().email("Invalid email"),
  phoneNumber: Yup.string().matches(PHONE_REGEXP, "Phone number is not valid"),
  address: Yup.string()
    .min(5, "Address Too Short")
    .max(40, "Address too long")
    .required("Address Required"),
  deliveryNotes: Yup.string(),
});

export default function CheckoutForm() {
  const { status, error, submitForm } = useCheckout();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        deliveryNotes: "",
      }}
      validationSchema={CHECKOUT_SCHEMA}
      onSubmit={submitForm}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-3 p-3">
          <div className="flex gap-2">
            <ErrorMessage
              name="firstName"
              component="div"
              className="flex-auto text-error"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="flex-auto text-error"
            />
          </div>
          <div className="w-full">
            <Field
              name="firstName"
              placeholder="FirstName"
              className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300 w-[49%] mr-[2%]"
            />
            <Field
              name="lastName"
              placeholder="LastName"
              className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300 w-[49%]"
            />
          </div>

          <ErrorMessage
            name="phoneNumber"
            component="p"
            className="text-error"
          />

          <Field
            name="phoneNumber"
            placeholder="Phone number"
            className="w-[50%] border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
          />

          <ErrorMessage name="address" component="p" className="text-error" />
          <Field
            name="address"
            placeholder="Address"
            className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
          />
          <ErrorMessage name="email" component="p" className="text-error" />
          <Field
            name="email"
            placeholder="different billing e-mail if needed"
            className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
          />
          <ErrorMessage
            name="deliveryNotes"
            component="p"
            className="text-error"
          />
          <Field
            name="deliveryNotes"
            component="textarea"
            placeholder="Delivery Notes"
            className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
          />
          <p className="w-max mx-auto my-4 font-medium text-md ">
            Payment Options
          </p>
          {status === "error" && <p className="text-error">{error}</p>}

          <PaymentField></PaymentField>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 bg-text-300 w-[90%] mx-auto py-2 text-white hover:border hover:border-text-300 hover:bg-white hover:text-text-300 transition-colors duration-150"
          >
            {isSubmitting ? (
              <div
                className="spinner text-white before:bg-white
               after:bg-white group-hover:before:bg-text-300 group-hover:after:bg-text-300 group-hover:text-text-300"
                id="spinner"
              ></div>
            ) : (
              "Complete Order"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
