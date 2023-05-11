import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetch } from "@/libraries/axios";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    fetch.post('/auth/info').then(() => {
      router.push('/');
    }).catch(() => {
      router.push('/auth0/login');
    });
  }, []);

  useEffect(() => {
    if (router.query?.r) {
      router.push('/auth0/signup?r=' + router.query.r);
    }
  }, [router.query]);

  return <></>;
};

export default Index;
