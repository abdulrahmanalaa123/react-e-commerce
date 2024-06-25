import { Navigate, useLoaderData } from "react-router-dom";
import { useLocation } from "react-router-dom";
import stripePromise from "../../lib/stripe";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./checkout.css";
const appearance = {
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
// const options = {
//   mode: 'payment',
//   amount: 1099,
//   currency: 'usd',
//   paymentMethodCreation: 'manual',
//   // Fully customizable with appearance API.
//   appearance: {/*...*/},
// };
export default function CheckOut() {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to="/" replace={true} />;
  }
  const secret = useLoaderData();
  const options = {
    clientSecret: secret,
    appearance,
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
