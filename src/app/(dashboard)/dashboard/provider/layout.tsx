import DashboardLayout from "@/components/layouts/DashboardLayout";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-poppins">
      {/* <WithAuth> */}
      <DashboardLayout role="PROVIDER">{children}</DashboardLayout>
      {/* </WithAuth> */}
    </div>
  );
};

export default layout;
