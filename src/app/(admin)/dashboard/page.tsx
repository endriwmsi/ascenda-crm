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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function DashboardPage() {
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
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <span className="text-3xl font-bold">Dashboard</span>

      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-6 sm:h-fit">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="max-h-[180px] border-muted bg-primary-foreground dark:border-muted dark:bg-primary-foreground">
            <CardHeader>
              <CardTitle>Daily Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <p className="text-2xl">$239,30</p>
                <div className="flex items-center justify-center rounded-lg bg-gray-100/60 px-2 py-1 text-[10px]">
                  <p className="text-green-500">30%</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm">You made an extra 35,000 this daily</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
