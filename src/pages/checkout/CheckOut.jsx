import { Navigate, useLoaderData } from "react-router-dom";
import stripePromise from "../../lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout/CheckoutForm";
import "./checkout.css";
import OrderSummary from "../../components/checkout/OrderSummary";

const APPEARANCE = {
  theme: "flat",
  variables: {
    colorPrimary: "#00000",
    colorDanger: "#EE1818",
    colorBackground: "#FBFFF9",
    colorText: "#232323",
    fontFamily: "Montserrat, sans-serif",
    borderRadius: "4px",
    fontSizeSm: "0.875rem",
    spacingUnit: "0.25rem",
    iconColor: "#232323",
    // #DCDCE4
    gridRowSpacing: "1rem",
    logoColor: "dark",
    colorTextPlaceholder: "#232323",
    // See all possible variables below
  },
  rules: {
    ".Input": {
      border: "solid",
      borderWidth: "1px",
      borderColor: "#DCDCE4",
      boxShadow: "none",
    },
    ".Input:focus": {
      boxShadow: "none",
      border: "solid",
      borderWidth: "1px",
      borderColor: "var(--colorPrimary)",
      transition: "background 0.15s ease, border 0.15s ease, color 0.15s ease",
    },
  },
};

function calculateTotalPrice(items) {
  return items.reduce((acc, currentObject) => {
    // Logic to transform the object
    return acc + currentObject.qty * currentObject.price;
  }, 0);
}

export default function CheckOut() {
  const data = useLoaderData();
  if (!data.length) {
    return <Navigate to="/" replace={true} />;
  }
  const options = {
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
    mode: "payment",
    amount: Number(calculateTotalPrice(data).toFixed(2) * 100),
    currency: "usd",
    paymentMethodCreation: "manual",
    appearance: APPEARANCE,
  };

  return (
    <Elements options={options} stripe={stripePromise}>
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
            <CheckoutForm />
          </section>
          <OrderSummary />
        </section>
      </section>
    </Elements>
  );
}
