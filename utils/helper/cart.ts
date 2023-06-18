import { CartItem } from "@/interfaces/product";

export function getCart(): CartItem[] {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(data: CartItem) {
  saveCarts([data]);
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function saveCarts(data: CartItem[]) {
  clearCart();
  localStorage.setItem("cart", JSON.stringify(data));
}

export function getQuantityOfProduct(id?: number) {
  if (!id) return 0;
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  return index > -1 ? cartData[index].quantity : 1;
}
