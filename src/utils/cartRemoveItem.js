function cartRemoveItem(cartItem, cartItems) {
  if (cartItem.product_id) {
    return cartItems.filter(
      (item) =>
        item.product_combination_id ||
        (item.product_id && item.product_id !== cartItem.product_id)
    );
  } else {
    return cartItems.filter(
      (item) =>
        item.product_id ||
        (item.product_combination_id &&
          item.product_combination_id !== cartItem.product_combination_id)
    );
  }
}
export default cartRemoveItem;
