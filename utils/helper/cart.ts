import { Product, CartItem } from "@/interfaces/product";

export function getCart(): CartItem[] {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function getCartDetail(products: Product[]): CartItem[] {
  let cart = getCart() as CartItem[];
  let data = cart.map(item => {
    let p = products.find(product => item.id == product.id)
    item.product = p;
    return item;
  });
  return data;
}

export function saveCart(data: CartItem) {
  saveCarts([data]);
}

export function saveCarts(data: CartItem[]) {
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(data));
}

export function deleteProductFromCart(id: number) {
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  cartData.splice(index, 1);
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(cartData));
}

export function getQuantityOfProduct(id?: number) {
  if (!id) return 0;
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  return index > -1 ? cartData[index].quantity : 1;
}
