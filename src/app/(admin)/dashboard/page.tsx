import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CardStats } from "./partials/card-stats";
import { Chart } from "./partials/chart";

export default function DashboardPage() {
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

      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-4 sm:h-fit">
        <span className="text-3xl font-bold">Dashboard</span>

        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-6">
          <CardStats
            title="Vendas diárias"
            value="239,30"
            percentage="30%"
            description="You made an extra 35,000 this daily"
            className="col-span-2"
          />
          <CardStats
            title="Vendas mensáis"
            value="7,230.00"
            percentage="12%"
            description="Your monthly revenue is improving!"
            className="col-span-2"
          />
          <CardStats
            title="Vendas anuais"
            value="85,320.00"
            percentage="-45%"
            description="Your yearly growth is substantial!"
            className="col-span-2 bg-primary text-primary-foreground"
          />

          <div className="col-span-3">
            <Chart
              title="Total Earnings"
              period="Janeiro 2021 - Janeiro 2022"
            />
          </div>

          <div className="col-span-3 grid gap-5">
            <div>{/* <DataTable /> */}</div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
