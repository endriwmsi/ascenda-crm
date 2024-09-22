"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroHome from "../_components/lp/hero-home";
import BusinessCategories from "../_components/lp/business-categories";
import LargeTestimonial from "../_components/lp/large-testimonial";
import Cta from "../_components/lp/cta";

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
