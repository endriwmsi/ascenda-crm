"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroHome from "../_components/landing-page/hero-home";
import BusinessCategories from "../_components/landing-page/business-categories";
import LargeTestimonial from "../_components/landing-page/large-testimonial";
import Cta from "../_components/landing-page/cta";

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
