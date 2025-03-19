import CustomerProfilePage from "@/components/pages/profile/customer/CustomerProfilePage";
import WithCustomer from "@/role-wrappers/WithCustomer";
import React from "react";

const page = () => {
  return (
    <WithCustomer>
      <CustomerProfilePage />
    </WithCustomer>
  );
};

export default page;
