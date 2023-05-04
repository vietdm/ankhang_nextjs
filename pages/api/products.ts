import { fetch } from "@/libraries/axios";

const { get } = fetch;

export interface Product{
  id: number;
  title: string;
  images: string[] | string;
  discount: number;
  description: string;
  created_at: string;
  updated_at: string;
  price: number;
};
export interface CartItem{
  quantity: number;
  id: number;
  product?: Product;
}
export function getProductsList() {
  return get("/products");
}

export async function getProductDetail(id: number) {
  const response = await get("/products") as {products: Product[]};
  return response?.products.find((item) => item.id === id);
}

export function getCart(): CartItem[] {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}
export function getCartDetail(products: Product[]): CartItem[] {
  let cart = getCart() as CartItem[];
  let data =  cart.map(item => {
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

export function deleteProductFromCart(id: number){
  const cartData = getCart() as CartItem[];
  let index = cartData.findIndex(item => item.id == id);
  cartData.splice(index,1);
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(cartData));
}
