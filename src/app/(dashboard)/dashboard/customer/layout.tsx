import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithCustomer from "@/role-wrappers/WithCustomer";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-poppins">
      <WithCustomer>
      <DashboardLayout role="CUSTOMER">{children}</DashboardLayout>
      </WithCustomer>
    </div>
  );
};

export default layout;
