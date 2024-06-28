import { useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import { useFormStatus } from "./formStatus";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/cart";
import cartToOrders, {
  createOrderDetails,
  createShippingDetails,
} from "../api/checkout/cartToOrders";
import confirmCreatePaymentIntent from "../api/checkout/confirmCreatePaymentIntent";

export default function useCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const loader = useLoaderData();
  const { status, setStatus, error, setErrorMsg, resetHook } = useFormStatus();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCartItems);

  const handleStripePayment = async (values) => {
    if (!stripe || !elements) {
      return null;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setStatus("error");
      setStatus(submitError.message);
      return null;
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
            stripeErrorHandler(nextActionError);
            return null;
          }
        }
        return paymentData.clientSecret;
      } catch (error) {
        console.error(error);
        setStatus("error");
        setErrorMsg("An unexpected error occurred.");
        return null;
      }
    } else {
      stripeErrorHandler(tokenError);
      return null;
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

  async function submitForm(values, actions) {
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
        clearCart();
        navigate(`/?status=success`, { replace: true });
      } catch (error) {
        setStatus("error");
        setErrorMsg("An unexpected error occurred, Please try again.");
      }
    } else {
      const secret = await handleStripePayment(values);
      if (secret) {
        clearCart();
        navigate(`/?paymentIntent=${secret}&status=success`, {
          replace: true,
        });
      }
    }
    actions.setSubmitting(false);
  }

  return { status, error, submitForm };
}
