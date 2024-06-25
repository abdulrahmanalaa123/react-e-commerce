import { Navigate, useLoaderData } from "react-router-dom";
import stripePromise from "../../lib/stripe";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./checkout.css";

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
    <div className="App">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
// export default CheckOut;
