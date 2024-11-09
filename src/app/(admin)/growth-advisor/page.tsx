"use client";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";

import { useSidebar } from "@/app/_hooks/use-sidebar";
import { useStore } from "@/app/_hooks/use-store";

export default function DashboardPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  return (
    <ContentLayout>
      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-6 sm:h-fit">
        <div className="h-screen max-h-[600px] w-full rounded-lg bg-white p-4 shadow-lg">
          <div className="h-screen max-h-[500px] rounded-lg bg-background px-4 py-2">
            a
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
