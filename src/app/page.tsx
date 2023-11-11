import { Hero } from "@/app/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promogate",
  description: "Compartilhe seus produtos com o mundo!"
}

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}