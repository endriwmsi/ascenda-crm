"use client";

import { useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import PageIllustration from "./page-illustration";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";

const avatars = [
  { src: "/images/avatar-01.jpg", alt: "Avatar 01" },
  { src: "/images/avatar-02.jpg", alt: "Avatar 02" },
  { src: "/images/avatar-03.jpg", alt: "Avatar 03" },
  { src: "/images/avatar-04.jpg", alt: "Avatar 04" },
  { src: "/images/avatar-05.jpg", alt: "Avatar 05" },
  { src: "/images/avatar-06.jpg", alt: "Avatar 06" },
];

export default function HeroHome() {
  const { theme } = useTheme();

  const previewImage =
    theme === "dark" ? "/images/preview-dark.png" : "/images/preview-white.png";

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 300,
      easing: "ease-out-cubic",
    });
  });

  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16" data-aos="zoom-y-out">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                {avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    className="box-content rounded-full border-2 border-gray-50"
                    src={avatar.src}
                    width={32}
                    height={32}
                    alt={avatar.alt}
                  />
                ))}
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              A Ferramenta que transforma <br className="max-lg:hidden" />o seu
              negócio
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-secondary-foreground"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Um simples e moderno CRM que transforma a forma como as empresas
                gerenciam suas suas estratégias comerciais.
              </p>
              <div
                className="relative flex items-center justify-center gap-2"
                data-aos="zoom-y-out"
                data-aos-delay={450}
              >
                <Button
                  variant="default"
                  className="shadow-[0px_0px_12px_#575757] dark:shadow-white"
                >
                  <Link href={"/auth/login"}>Começar agora</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative rounded-2xl shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,theme(colors.slate.300/.8),transparent)1]">
              <Image
                className="h-auto w-auto rounded-2xl"
                src={previewImage}
                width={1000}
                height={600}
                alt="Hero image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
