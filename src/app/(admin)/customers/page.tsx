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
import { LeadsTable } from "./partials/table/leads-table";
import { columns } from "./partials/table/columns";
import LeadsComponent from "./partials/leads-component";
import { getCustomers } from "@/actions/customers/get-customers";

const CustomersPage = async () => {
  const data = await getCustomers();

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
            <BreadcrumbPage>Clientes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-1 flex-col space-y-2 overflow-y-hidden py-4 sm:h-fit">
        <LeadsComponent />
      </div>

      <LeadsTable columns={columns} data={data} />
    </ContentLayout>
  );
};

export default CustomersPage;
