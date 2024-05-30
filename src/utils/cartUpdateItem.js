function cartUpdateItem(cartItem, currentItems) {
  let index;
  if (cartItem.product_combination_id) {
    index = currentItems.findIndex(
      (item) =>
        item.product_combination_id &&
        item.product_combination_id === cartItem.product_combination_id
    );
  } else {
    index = currentItems.findIndex(
      (item) => item.product_id && item.product_id === cartItem.product_id
    );
  }
  let newList = [...currentItems];
  newList[index] = cartItem;
  return newList;
}

export default cartUpdateItem;
