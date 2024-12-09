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
import Tasks from "./partials/tasks";
import { getTasks } from "@/actions/tasks/get-tasks";

const DashboardPage = async () => {
  const stats = await getTransactionStats();
  const chartData = await getChartTransactions();
  const tasks = await getTasks();

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

      <div className="flex flex-1 flex-col space-y-2 py-4 sm:h-fit">
        <span className="text-3xl font-bold">Dashboard</span>

        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-9">
          <div className="col-span-9 flex justify-between gap-4 overflow-y-hidden overflow-x-scroll sm:w-full sm:overflow-x-hidden">
            <CardStats
              title="Receita mensal"
              value={stats.monthlyRevenue}
              percentage={stats.monthlyChange}
              description="Comparação com o mês passado"
              className="w-full"
            />
            <CardStats
              title="Receita anual"
              value={stats.yearlyRevenue}
              percentage={stats.yearlyChange}
              description="Comparação com o ano passado"
              className="w-full"
            />
            <CardStats
              title="Bruto mensal"
              value={stats.yearlyRevenue}
              percentage={stats.yearlyChange}
              description="Comparação com o ano passado"
              className="w-full bg-primary text-primary-foreground"
            />
          </div>

          <div className="col-span-9 sm:col-span-5">
            <Chart
              data={chartData}
              title="Fluxo de Caixa"
              period="Janeiro 2021 - Janeiro 2022"
            />
          </div>

          <div className="col-span-9 flex flex-col sm:col-span-4">
            <Tasks data={tasks} />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
