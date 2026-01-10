import { fetchJson } from "./apiClient";

const CART_PREFIX = "cart_";

function cartKey(userId) {
  return CART_PREFIX + String(userId);
}

async function getRawCart(userId) {
  const raw = localStorage.getItem(cartKey(userId));
  if (raw) return JSON.parse(raw);

  const cart = { userId: String(userId), items: [] };
  localStorage.setItem(cartKey(userId), JSON.stringify(cart));
  return cart;
}

async function saveRawCart(cart) {
  localStorage.setItem(cartKey(cart.userId), JSON.stringify(cart));
}

export async function updateQuantity(userId, productId, deltaQty) {
  userId = String(userId);
  productId = Number(productId);

  const cart = await getRawCart(userId);
  const item = cart.items.find((i) => Number(i.productId) === productId);

  if (!item && deltaQty > 0) {
    cart.items.push({ productId, quantity: deltaQty });
  }

  if (item) {
    item.quantity += deltaQty;
  }

  cart.items = cart.items.filter((i) => i.quantity > 0);
  await saveRawCart(cart);
}

export async function getCart(userId, fields = null) {
  userId = String(userId);
  const cart = await getRawCart(userId);
  const products = await fetchJson("products.json");

  return {
    userId,
    items: cart.items
      .map((i) => {
        const p = products.find((x) => String(x.id) === String(i.productId));
        if (!p) return null;

        return {
          product: pickFields(p, fields),
          quantity: i.quantity,
        };
      })
      .filter(Boolean),
  };
}

export async function mergeGuestCartToUser(userId) {
  const guest = await getRawCart("guest");
  if (!guest.items.length) return;

  const user = await getRawCart(String(userId));

  guest.items.forEach((g) => {
    const u = user.items.find((i) => i.productId === g.productId);
    if (u) u.quantity += g.quantity;
    else user.items.push(g);
  });

  await saveRawCart(user);
  localStorage.removeItem(cartKey("guest"));
}

function pickFields(product, fields) {
  if (!fields) return product;

  const obj = {};
  fields.forEach((f) => (obj[f] = product[f]));
  return obj;
}

export async function getCartCount(userId) {
  userId = String(userId);
  const cart = await getRawCart(userId);

  return cart.items.length;
}
