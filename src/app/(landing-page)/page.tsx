import HeroHome from "../_components/landing-page/hero-home";
import BusinessCategories from "../_components/landing-page/business-categories";
import LargeTestimonial from "../_components/landing-page/large-testimonial";
import Cta from "../_components/landing-page/cta";

export default function Home() {
  return (
    <>
      <HeroHome />
      <BusinessCategories />
      <LargeTestimonial />
      <Cta />
    </>
  );
}
