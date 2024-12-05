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
import { getTransactionStats } from "@/actions/transactions/get-transactions-stats";
import { getChartTransactions } from "@/actions/transactions/get-chart-transactions";
import Chart from "./partials/chart";

const DashboardPage = async () => {
  const stats = await getTransactionStats();
  const chartData = await getChartTransactions();

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
            title="Receita semanal"
            value={stats.weeklyRevenue}
            percentage={stats.weeklyChange}
            description="Comparação com a semana passada"
            className="col-span-2"
          />
          <CardStats
            title="Receita mensal"
            value={stats.monthlyRevenue}
            percentage={stats.monthlyChange}
            description="Comparação com o mês passado"
            className="col-span-2"
          />
          <CardStats
            title="Receita anual"
            value={stats.yearlyRevenue}
            percentage={stats.yearlyChange}
            description="Comparação com o ano passado"
            className="col-span-2 bg-primary text-primary-foreground"
          />

          <div className="col-span-3">
            <Chart
              data={chartData}
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
};

export default DashboardPage;
