import OrderMealPage from "@/components/pages/order-meal/OrderMealPage";
import WithAuth from "@/role-wrappers/WithAuth";
import React from "react";

const page = () => {
  return (
    <WithAuth>
      <OrderMealPage />
    </WithAuth>
  );
};

export default page;
