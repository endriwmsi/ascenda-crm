"use server";

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
import { columns } from "./partials/table/columns";
import FinanceComponent from "./partials/finance-component";
import { FinancesTable } from "./partials/table/finances-table";
import { getFinances } from "@/actions/transactions/get-finances";

const FinancialPage = async () => {
  const data = await getFinances();

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
            <BreadcrumbPage>Financeiro</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <FinanceComponent />

      <FinancesTable columns={columns} data={data} />
    </ContentLayout>
  );
};

export default FinancialPage;
