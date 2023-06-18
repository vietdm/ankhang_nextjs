import { useRouter } from "next/router";
import { useEffect } from "react";

const AffilatePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query?.username) {
      if (router.query.username == "") {
        router.push("/auth0/login");
      } else {
        router.push("/auth0/signup?r=" + router.query.username);
      }
    } else {
      router.push("/auth0/login");
    }
  }, [router.query]);

  return <></>;
};

export default AffilatePage;
