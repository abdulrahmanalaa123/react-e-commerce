export function variantCartItemModel({ id, qty }) {
  this.product_combination_id = id;
  this.qty = qty;
}
export function inVariantCartItemModel({ uuid, qty }) {
  this.product_id = uuid;
  this.qty = qty;
}
