import Image from "next/image";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 lg:w-1/2">
        <Image src="/images/logo.svg" alt="login" width={100} height={100} />

        <div className="w-full max-w-[504px] px-8">{children}</div>
      </div>

      <div className="hidden h-full w-1/2 items-center justify-center shadow-lg lg:flex">
        <Image
          src="/images/abstract.jpg"
          alt="login"
          height={960}
          width={656}
          className="relative h-full max-h-[960px] w-full max-w-[656px] select-none rounded-l-lg object-cover"
        />
      </div>
    </div>
  );
}
