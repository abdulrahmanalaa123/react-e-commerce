import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../stores/cart";
import me from "../auth/me";

export default async function cartToOrders(orderDetails) {
  const userData = await me();
  orderDetails.user_id = userData.user.id;
  const { error } = await supabase.rpc("cart_to_order", {
    order_details: orderDetails,
  });

  if (error) {
    throw error;
  } else {
    useCartStore.getState().clearCartItems();
  }
}

export function createOrderDetails(
  userId,
  paymentMethod,
  shipping,
  orderStatus
) {
  this.user_id = userId;
  this.payment_method = paymentMethod;
  this.shipping_address = shipping;
  this.order_status = orderStatus;
}
export function createShippingDetails(values) {
  this.name = values.firstName + " " + values.lastName;
  this.phone = values.phoneNumber;
  this.address = {
    city: "Alexandria",
    country: "EG",
    line1: values.address,
  };
}
