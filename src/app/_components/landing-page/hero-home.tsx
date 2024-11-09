import Image from "next/image";
import PageIllustration from "./page-illustration";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroHome() {
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
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-01.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-02.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-03.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-04.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-05.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={"/images/avatar-06.jpg"}
                  width={32}
                  height={32}
                  alt="Avatar 06"
                />
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
                <Button>
                  <Link href={"/auth/login"}>Começar</Link>
                </Button>

                <Button variant="secondary">
                  <Link href={"/learn"}>Saiba mais</Link>
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
                src={"/images/preview.png"}
                width={800}
                height={500}
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
