// Defines cart item identity and checkout snapshots consistently across both clients.
export function cartReference(value) {
  const parts = String(typeof value === 'object' ? (value.productId ?? value.id) : value).split(
    ':',
  );
  const productId = Number(parts[0]);
  const variantId =
    typeof value === 'object' && value.variantId != null
      ? Number(value.variantId)
      : parts[1]
        ? Number(parts[1])
        : null;
  if (
    parts.length > 2 ||
    !Number.isSafeInteger(productId) ||
    productId < 1 ||
    (variantId !== null && (!Number.isSafeInteger(variantId) || variantId < 1))
  )
    throw new Error('Invalid cart item.');
  return { productId, variantId };
}
export function cartIdentity(value) {
  const { productId, variantId } = cartReference(value);
  return variantId === null ? productId : `${productId}:${variantId}`;
}
export function checkoutLines(items) {
  return items.map((item) => ({ ...cartReference(item), quantity: item.quantity }));
}
export function checkoutFingerprint(items) {
  return JSON.stringify(
    checkoutLines(items).sort(
      (a, b) => a.productId - b.productId || (a.variantId || 0) - (b.variantId || 0),
    ),
  );
}
export function variantLabel(variant) {
  return [variant.size, variant.color, variant.sku].filter(Boolean).join(' / ');
}
export function selectedProduct(product, variant) {
  if (product.acceptingOrders === false)
    throw new Error('This seller is not accepting new orders.');
  if (product.variants?.length && !variant) throw new Error('Choose a product option.');
  return {
    ...product,
    productId: product.id,
    variantId: variant?.id ?? null,
    variantSku: variant?.sku,
    variantDescription: variant ? variantLabel(variant) : null,
    price: Number(product.price) + Number(variant?.additionalPrice || 0),
    stockQuantity: variant ? variant.stockQuantity : product.stockQuantity,
    imageUrl: variant?.imageUrl || product.imageUrl,
  };
}
