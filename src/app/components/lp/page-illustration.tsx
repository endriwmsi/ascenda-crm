import Image from "next/image";

export default function PageIllustration() {
  return (
    <>
      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 top-12 -z-10 -translate-x-1/2 transform sm:top-0"
        aria-hidden="true"
      >
        <Image
          src={"/images/stripes-dark.svg"}
          width={768}
          height={300}
          alt="Stripes"
          className="h-auto w-auto text-primary"
          priority
        />
      </div>
      {/* Circles */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 ml-[580px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 opacity-50 blur-[160px] sm:block" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[420px] ml-[380px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px] sm:block" />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-[640px] -ml-[300px] hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <div className="hidden h-80 w-80 rounded-full bg-gradient-to-tr from-blue-500 to-gray-900 opacity-50 blur-[160px] sm:block" />
      </div>
    </>
  );
}
