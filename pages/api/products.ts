import { fetch } from "@/libraries/axios";

const { get } = fetch;

export function getProductsList() {
  return get("/products");
}

export function getProductDetail(id: number) {
  return get(`/product/${id}`);
}


