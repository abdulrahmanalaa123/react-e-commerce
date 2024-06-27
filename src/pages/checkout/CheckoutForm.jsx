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
import confirmCreatePaymentIntent from "../../api/checkout/confirmCreatePaymentIntent";
import cartToOrders, {
  createOrderDetails,
  createShippingDetails,
} from "../../api/checkout/cartToOrders";

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

const PaymentField = () => {
  const { values } = useFormikContext();

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
  const stripe = useStripe();
  const elements = useElements();
  const loader = useLoaderData();
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();
  const navigate = useNavigate();

  const handleStripePayment = async (values) => {
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setStatus("error");
      setStatus(submitError.message);
      return;
    }
    const { confirmationToken, error: tokenError } =
      await stripe.createConfirmationToken({
        elements,
        params: {
          shipping: new createShippingDetails(values),
        },
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}`,
      });
    if (!tokenError) {
      try {
        let paymentData = await confirmCreatePaymentIntent({
          cartData: loader,
          confirmationToken: confirmationToken,
        });
        console.log(paymentData);
        if (paymentData["error"]) {
          stripeErrorHandler(paymentData["error"]["raw"]);
        } else if (paymentData.status === "requires_action") {
          const { error: nextActionError } = await stripe.handleNextAction({
            clientSecret: paymentData.clientSecret,
          });

          if (nextActionError) {
            console.log(nextActionError);
            stripeErrorHandler(nextActionError);
          } else {
            navigate(
              `/?paymentIntent=${paymentData.clientSecret}&status=success`,
              { replace: true }
            );
          }
        } else {
          navigate(
            `/?paymentIntent=${paymentData.clientSecret}&status=success`,
            { replace: true }
          );
        }
      } catch (supabaseError) {
        setStatus("error");
        setErrorMsg("An unexpected error occurred.");
      }
    } else {
      stripeErrorHandler(tokenError);
    }
  };

  function stripeErrorHandler(stripeError) {
    if (
      stripeError.type === "card_error" ||
      stripeError.type === "validation_error"
      // ||
      // stripeError.type === "invalid_request_error"
    ) {
      setStatus("error");
      setErrorMsg(stripeError.message);
    } else {
      setStatus("error");
      setErrorMsg("An unexpected error occurred.");
    }
  }

  return (
    <section id="checkout-page" className="w-full h-full">
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
              address: "",
              deliveryNotes: "",
            }}
            validationSchema={CHECKOUT_SCHEMA}
            onSubmit={async (values, actions) => {
              resetHook();
              if (values.paymentOptions === "cash") {
                const shippingDetails = new createShippingDetails(values);
                const orderDetails = new createOrderDetails(
                  "cash",
                  shippingDetails,
                  "Success"
                );
                try {
                  await cartToOrders(orderDetails);
                  navigate(`/?status=success`, { replace: true }),
                    console.log("href", window.location.origin);
                } catch (error) {
                  setStatus("error");
                  setErrorMsg(
                    "An unexpected error occurred, Please try again."
                  );
                }
              } else {
                await handleStripePayment(values);
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
}
