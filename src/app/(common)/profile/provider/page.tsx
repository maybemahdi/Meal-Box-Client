import ProviderProfilePage from "@/components/pages/profile/Provider/ProviderProfilePage";
import WithProvider from "@/role-wrappers/WithProvider";
import React from "react";

const page = () => {
  return (
    <WithProvider>
      <ProviderProfilePage />
    </WithProvider>
  );
};

export default page;
