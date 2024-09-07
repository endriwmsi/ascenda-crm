import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <Header /> */}
      <div className="flex h-screen p-4">
        <Sidebar />

        <div className="w-full overflow-x-auto rounded-lg bg-card p-4 shadow-lg">
          <div className="sm:h-[calc(99vh-60px)]">
            <div className="h-[calc(100vh - 120px)] relative mx-auto flex w-full justify-center">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
