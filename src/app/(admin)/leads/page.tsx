"use client";
import Link from "next/link";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";

import { useSidebar } from "@/app/_hooks/use-sidebar";
import { useStore } from "@/app/_hooks/use-store";

export default function LeadsPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  return (
    <ContentLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Leads</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-4 sm:h-fit">
        <span className="text-3xl font-bold">Leads</span>
        <div className="h-12 w-full rounded-lg border border-dashed border-zinc-500"></div>
        <div className="h-64 w-full rounded-lg border border-dashed border-zinc-500"></div>
        <div className="h-64 w-full rounded-lg border border-dashed border-zinc-500"></div>
        <div className="h-64 w-full rounded-lg border border-dashed border-zinc-500"></div>
        <div className="h-64 w-full rounded-lg border border-dashed border-zinc-500"></div>
        <div className="h-64 w-full rounded-lg border border-dashed border-zinc-500"></div>
      </div>
    </ContentLayout>
  );
}
