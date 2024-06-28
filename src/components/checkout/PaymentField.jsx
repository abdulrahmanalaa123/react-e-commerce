import { PaymentElement } from "@stripe/react-stripe-js";
import { Field, useFormikContext } from "formik";

function PaymentField() {
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
}

export default PaymentField;
