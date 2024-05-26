import cartRemoveItem from "./cartRemoveItem";

export default function cartAddWithCollision(cartItem, currentItems) {
  if (cartItem.product_combination_id) {
    let index = currentItems.findIndex(
      (item) =>
        item.product_combination_id &&
        item.product_combination_id === cartItem.product_combination_id
    );
    if (index === -1) {
      return [...currentItems, cartItem];
    } else {
      const currentObject = currentItems[index];
      const newCart = [
        ...cartRemoveItem(cartItem, currentItems),
        { ...currentObject, qty: cartItem.qty + currentObject.qty },
      ];
      return newCart;
    }
  } else {
    let index = currentItems.findIndex(
      (item) => item.product_id && item.product_id === cartItem.product_id
    );
    if (index === -1) {
      return [...currentItems, cartItem];
    } else {
      const currentObject = currentItems[index];
      const newCart = [
        ...cartRemoveItem(cartItem, currentItems),
        { ...currentObject, qty: cartItem.qty + currentObject.qty },
      ];
      return newCart;
    }
  }
}
