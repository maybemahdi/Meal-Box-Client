import DashboardLayout from "@/components/layouts/DashboardLayout";
import WithProvider from "@/role-wrappers/WithProvider";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-poppins">
      <WithProvider>
        <DashboardLayout role="PROVIDER">{children}</DashboardLayout>
      </WithProvider>
    </div>
  );
};

export default layout;
