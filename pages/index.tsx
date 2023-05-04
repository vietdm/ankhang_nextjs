import { Box, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { HomeComponent } from "@/components/home/Home";
import { getProductsList } from "./api/products";
import { Product } from "../interfaces/product";
import Link from "next/link";
import Layout from "@/components/layout";

const Home = ({products = []}: {products : Product[]}) => {
  return (
    <Layout>
      <HomeComponent products={products}/> 
    </Layout>
  );
};

export async function getStaticProps() {
  const reponse = await getProductsList() as any;
  return {
      props:{products: reponse?.products}
  }
}
export default Home;
