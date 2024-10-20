import { Navbar } from "../navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}