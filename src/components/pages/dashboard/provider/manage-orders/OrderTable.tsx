import { cn } from "@/lib/utils";
import { useUpdateOrderStatusMutation } from "@/redux/features/order/order.provider.api";
import { IOrder } from "@/types";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { Dropdown } from "antd";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";


// Modal Component
const OrderDetailsModal = ({
  order,
  onClose,
}: {
  order: IOrder;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-3xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">Order Details</h3>
          <button
            onClick={onClose}
            className="p-2 bg-primary text-white rounded-full"
          >
            <X className="text-white" />
          </button>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Meal ID:</span>
            <span>{order?.mealId?._id}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Meal Name:</span>
            <span>{order?.mealId?.name}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Amount:</span>
            <span>${order?.amount}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Customer Name:</span>
            <span>{order?.customerId?.name}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Customer Email:</span>
            <span>{order?.customerId?.email}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Payment Status:</span>
            <span
              className={cn("px-3 py-1 rounded-full", {
                "bg-green-100 text-green-500": order?.paymentStatus === "PAID",
                "bg-yellow-100 text-yellow-500":
                  order?.paymentStatus === "PENDING",
              })}
            >
              {order?.paymentStatus.charAt(0).toUpperCase() +
                order?.paymentStatus.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Dietary Preferences:</span>
            <span>
              {Array.isArray(order?.customerId?.dietaryPreferences) &&
              order?.customerId?.dietaryPreferences.length > 0
                ? order?.customerId?.dietaryPreferences.join(", ")
                : "N/A"}
            </span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Shipping Address:</span>
            <span>{order?.deliveryAddress}</span>
          </div>
          <div className="flex flex-wrap justify-between">
            <span className="font-semibold">Schedule:</span>
            <span>{order?.schedule}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderTable = ({ orders }: { orders: IOrder[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const updateStatus = async (status: string, id: string) => {
    await handleAsyncWithToast(async () => {
      return updateOrderStatus({ data: { status: status }, id: id });
    }, "Updating...");
  };

  const handleRowClick = (order: IOrder) => {
    setSelectedOrder(order); // Set selected order
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  return (
    <div className="w-full overflow-x-auto border border-gray-300 rounded-lg">
      <table className={`w-full rounded-lg`}>
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Order Id
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Image
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Price
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Availability
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 tracking-wider border-b">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.length ? (
            orders?.map((item: IOrder, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(item)}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 cursor-pointer"
                    : "bg-gray-100 cursor-pointer"
                }
              >
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <div className="w-20 h-16 relative">
                    <Image
                      src={item?.mealId?.image}
                      alt={item._id}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {item?.mealId?.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  ${item?.amount?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <span
                    className={cn("py-1 px-2 rounded-full text-white text-xs", {
                      "bg-green-500": item?.mealId?.availability,
                      "bg-rose-500": !item?.mealId?.availability,
                    })}
                  >
                    {item?.mealId?.availability ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  <span>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: "1",
                            label: (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus("PENDING", item._id);
                                }}
                                className="text-yellow-500 w-full text-start"
                              >
                                Pending
                              </button>
                            ),
                          },
                          {
                            key: "2",
                            label: (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus("ACCEPTED", item._id);
                                }}
                                className="text-blue-500 w-full text-start"
                              >
                                Accepted
                              </button>
                            ),
                          },
                          {
                            key: "3",
                            label: (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateStatus("DELIVERED", item._id);
                                }}
                                className="text-green-500 w-full text-start"
                              >
                                Delivered
                              </button>
                            ),
                          },
                          {
                            key: "4",
                            label: (
                              <button
                                onClick={() =>
                                  updateStatus("CANCELLED", item._id)
                                }
                                className="text-rose-500 w-full text-start"
                              >
                                Cancelled
                              </button>
                            ),
                          },
                        ],
                      }}
                      trigger={["click"]}
                      placement="bottom"
                      arrow
                    >
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "py-1 px-2 flex items-center rounded-full text-white text-xs",
                          {
                            "text-yellow-500 bg-yellow-100":
                              item?.status === "PENDING",
                            "text-blue-500 bg-blue-100":
                              item?.status === "ACCEPTED",
                            "text-green-500 bg-green-100":
                              item?.status === "DELIVERED",
                            "text-rose-500 bg-rose-100":
                              item?.status === "CANCELLED",
                          }
                        )}
                      >
                        {item?.status}
                        <span>
                          <ChevronDown />
                        </span>
                      </button>
                    </Dropdown>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center text-xl text-rose-500 font-semibold py-5"
              >
                No Order yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default OrderTable;
