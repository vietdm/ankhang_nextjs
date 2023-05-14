import { useEffect } from "react";
import { useRouter } from 'next/router'
import { getCart } from "@/utils/helper/cart";
import { Storage } from "@/libraries/storage";
import { Loading } from "@/components/layout/Loading";

const CartPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Storage.get('_token');
    const cart = getCart();
    const uriCart = `token=${token}&carts=${JSON.stringify(cart)}`;
    router.push("/cart0/trade.html?" + uriCart);
  }, [])

  return <Loading />;
}

export default CartPage;
