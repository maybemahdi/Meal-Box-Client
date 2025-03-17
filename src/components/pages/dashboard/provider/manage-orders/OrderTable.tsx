import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export interface IOrder {
  _id: string;
  customerId: string;
  mealId: string;
  mealProviderId: string;
  amount: number;
  customization?: string;
  schedule: string; // Using string as MongoDB stores dates in ISO format
  deliveryAddress: string;
  status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED"; // Enum-like values
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  paymentIntentId?: string;
}


const OrderTable = ({ orders }: { orders: IOrder[] }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full border-collapse`}>
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Image
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Description
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Price
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Availability
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders?.map((item: IOrder, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white cursor-pointer"
                    : "bg-gray-50 cursor-pointer"
                }
              >
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {/* <div className="w-20 h-16 relative">
                    <Image
                      src={item._id || "/placeholder.svg"}
                      alt={item._id}
                      fill
                      className="object-cover rounded"
                    />
                  </div> */}
                  <span>{item._id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  ${item.amount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {/* <span className="">Available</span> */}
                  <span>{item._id}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <div className="flex gap-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p className="text-xl text-dashboard-primary font-semibold mt-5">
              No Products yet
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
