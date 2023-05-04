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
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id === data.id);
  if (index > -1) cartData[index] = data;
  else cartData.push(data);
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(cartData));
}

export function deleteProductFromCart(id: number) {
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  cartData.splice(index, 1);
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(cartData));
}

export function getQuantityOfProduct(id: number) {
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  return index > -1 ? cartData[index].quantity : 1;
}
