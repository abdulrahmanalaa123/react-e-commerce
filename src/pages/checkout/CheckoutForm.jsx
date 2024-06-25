import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import OrderSummary from "../../components/checkout/OrderSummary";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useLoaderData } from "react-router-dom";
import { useFormStatus } from "../../hooks/formStatus";
import { useNavigate } from "react-router-dom";
import { p } from "@table-library/react-table-library/styles-492c6342";

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

const PaymentField = (props) => {
  const { values, submitForm } = useFormikContext();

  return (
    <div role="group" id="payment-options" className="flex flex-col gap-3">
      <label
        className=" border-[#DCDCE4] border p-6 flex items-start gap-4"
        style={{
          backgroundColor:
            values.paymentOptions === "cash" ? "#ECFFE0" : "rgb(255 255 255)",
        }}
      >
        <Field
          type="radio"
          required
          name="paymentOptions"
          value="cash"
          className="w-5 h-5"
        />
        <div>
          <p>Cash on delivery</p>
          <p className="text-[0.75rem]">Pay when the product is recieved</p>
        </div>
      </label>
      <label
        className=" border-[#DCDCE4] border p-6 flex items-start gap-4"
        style={{
          backgroundColor:
            values.paymentOptions === "credit" ? "#ECFFE0" : "rgb(255 255 255)",
        }}
      >
        <Field
          type="radio"
          required
          name="paymentOptions"
          value="credit"
          className="w-5 h-5"
        />
        <div>
          <p>Credit/Debit Card</p>
          <p className="text-[0.75rem] mb-4">
            Payment uses Stripe and collect information like Ip address
            <br /> and credit card details for security measures
          </p>
          {values.paymentOptions === "credit" ? (
            <PaymentElement
              id="payment-element"
              options={{
                layout: "tabs",
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </label>
    </div>
  );
};
export default function CheckoutForm() {
  const loader = useLoaderData();
  const stripe = useStripe();
  const elements = useElements();
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );

    if (!loader) {
      return;
    }

    stripe.retrievePaymentIntent(loader).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setStatus("Payment succeeded");
          break;
        case "processing":
          setStatus("Your payment is processing.");
          break;
        case "requires_payment_method":
          setStatus(error);
          setErrorMsg("Your payment was not successful, please try again.");
          break;
        default:
          setStatus(error);
          setErrorMsg("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (values) => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        shipping: {
          name: values.firstName + " " + values.lastName,
          phone: values.phone,
          address: {
            city: "Alexandria",
            country: "EG",
            line1: values.address,
          },
        },
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      setStatus("error");
      console.log(error);
      setErrorMsg("An unexpected error occurred.");
    }
  };

  return (
    <section id="checkout-page" className="w-full h-full">
      {status !== "error" && (
        <p className="font-bold text-primary-300 text-lg">{status}</p>
      )}
      <p className="mx-auto mt-6 font-medium text-xl w-min">Checkout</p>

      <section id="checkout-view" className="grid grid-cols-5 gap-6 h-full">
        <section
          id="checkoutForm"
          className="col-span-5 bg-backgrounds-cardsBg md:col-span-3 md:mb-20 "
        >
          <p className="w-max mx-auto my-4 font-medium text-md ">
            Billing Details
          </p>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              deliveryNotes: "",
            }}
            validationSchema={CHECKOUT_SCHEMA}
            onSubmit={async (values, actions) => {
              if (values.paymentOptions === "cash") {
                navigate("/checkout/sucess");
              } else {
                await handleSubmit(values);
              }
              actions.setSubmitting(false);
            }}
            validateOnChange={false}
            validateOnBlur={true}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form className="flex flex-col gap-3 p-3" onSubmit={handleSubmit}>
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
                <div className="flex gap-2">
                  <div className="flex flex-auto flex-col gap-2">
                    <Field
                      name="firstName"
                      placeholder="FirstName"
                      className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
                    />
                  </div>
                  <div className="flex flex-auto flex-col gap-2">
                    <Field
                      name="lastName"
                      placeholder="LastName"
                      className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
                    />
                  </div>
                </div>

                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className="text-error"
                />
                <div className="flex gap-2">
                  <Field
                    name="phoneNumber"
                    placeholder="Phone number"
                    className="flex-auto flex flex-col gap-2 border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
                  />
                  <div className="flex-auto flex flex-col gap-2"></div>
                </div>
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-error"
                />
                <Field
                  name="address"
                  placeholder="Address"
                  className="border-InputBorder border py-[10px] px-4 text-text-input placeholder:text-text-300"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-error"
                />
                <Field
                  name="email"
                  placeholder="E-mail"
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
        </section>
        <OrderSummary />
      </section>
    </section>
  );
  // return (
  //   <form id="payment-form" onSubmit={handleSubmit}>
  //     <PaymentElement id="payment-element" options={paymentElementOptions} />
  //     <button
  //       className="pay-button"
  //       disabled={isLoading || !stripe || !elements}
  //       id="submit"
  //     >
  //       <span id="button-text">
  //         {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
  //       </span>
  //     </button>
  //     {/* Show any error or success messages */}

  //     {message && <div id="payment-message">{message}</div>}
  //   </form>
  // );
}
