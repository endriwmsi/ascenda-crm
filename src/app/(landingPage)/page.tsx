"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroHome from "../components/lp/hero-home";
import BusinessCategories from "../components/lp/business-categories";
import LargeTestimonial from "../components/lp/large-testimonial";
import Cta from "../components/lp/cta";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 300,
      easing: "ease-out-cubic",
    });
  });

  return (
    <>
      <HeroHome />
      <BusinessCategories />
      <LargeTestimonial />
      <Cta />
    </>
  );
}
