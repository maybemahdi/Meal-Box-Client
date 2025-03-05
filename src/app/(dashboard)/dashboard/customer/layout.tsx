import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-poppins">
      {/* <WithAuth> */}
      <DashboardLayout role="CUSTOMER">{children}</DashboardLayout>
      {/* </WithAuth> */}
    </div>
  );
};

export default layout;
