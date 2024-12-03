import { Navbar } from "./navbar";

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="w-full px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}
