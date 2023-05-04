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