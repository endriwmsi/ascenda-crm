"use client";

import { useEffect } from "react";
import LPHeader from "../../components/landing-page/LPHeader";
import Footer from "../../components/landing-page/footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <LPHeader />
      <main className="grow">{children}</main>
      <Footer border={true} />
    </>
  );
}
