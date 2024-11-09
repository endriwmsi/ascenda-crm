import bgImage from "./../../../public/images/abstract.jpg";
import Logo from "../_components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 lg:w-1/2">
        <Logo />

        <div className="w-full max-w-[504px] px-8">{children}</div>
      </div>

      <div className="hidden h-full w-1/2 items-center justify-center shadow-lg lg:flex">
        <div
          className="h-screen w-full rounded-l-xl"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
