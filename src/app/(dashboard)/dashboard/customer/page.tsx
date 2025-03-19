import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard/customer/my-order"); // Replace with your target route
  return null;
};

export default Page;
