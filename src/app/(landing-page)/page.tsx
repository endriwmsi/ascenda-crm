import HeroHome from "../../components/landing-page/hero-home";
import BusinessCategories from "../../components/landing-page/business-categories";
import LargeTestimonial from "../../components/landing-page/large-testimonial";
import Cta from "../../components/landing-page/cta";

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
