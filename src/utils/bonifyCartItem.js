function bonifyCartItem(cartItem) {
  const eqString = cartItem.product_id
    ? "product_id"
    : "product_combination_id";
  const postObject = {
    [eqString]: cartItem[eqString],
    qty: cartItem.qty,
  };
  return postObject;
}

export default bonifyCartItem;
