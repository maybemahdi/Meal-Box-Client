/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import { useGetOrdersForProviderQuery } from "@/redux/features/order/order.provider.api";
import { DatePicker, DatePickerProps, Dropdown, MenuProps } from "antd";
import { ChevronDown, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";

const ManageOrdersPage = () => {
  const [filterByStatus, setFilterByStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchDate, setSearchDate] = useState<{ name: string; value: any }[]>(
    []
  );
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([]);

  useEffect(() => {
    setObjectQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ]);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
    setObjectQuery([
      { name: "page", value: 1 },
      { name: "limit", value: pageSize },
      ...searchDate,
    ]);
  }, [searchDate]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetOrdersForProviderQuery(objectQuery);

  const orders = response?.data;

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setSearchDate([{ name: "date", value: dateString }]);
  };

  const resetSearchAndFilter = () => {
    setSearchDate([]);
    setPage(1);
  };

  const filterItemsByStatus: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => setFilterByStatus("All")}
          rel="noopener noreferrer"
          className="text-gray-500 w-full text-start"
        >
          All
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => setFilterByStatus("PENDING")}
          rel="noopener noreferrer"
          className="text-yellow-500 w-full text-start"
        >
          Pending
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => setFilterByStatus("ACCEPTED")}
          rel="noopener noreferrer"
          className="text-blue-500 w-full text-start"
        >
          Accepted
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button
          onClick={() => setFilterByStatus("DELIVERED")}
          rel="noopener noreferrer"
          className="text-green-500 w-full text-start"
        >
          Delivered
        </button>
      ),
    },
    {
      key: "5",
      label: (
        <button
          onClick={() => setFilterByStatus("CANCELLED")}
          rel="noopener noreferrer"
          className="text-red-500 w-full text-start"
        >
          Cancelled
        </button>
      ),
    },
  ];

  if (isLoading || isFetching) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Order</h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-5">
        <div className="w-full md:basis-2/5">
          <DatePicker
            style={{
              width: "100%",
              color: "#5b5454",
              padding: "10px",
              borderRadius: "8px",
            }}
            placeholder="Search Order by Date"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            menu={{ items: filterItemsByStatus }}
            trigger={["click"]}
            placement="bottom"
            arrow
          >
            <button className="flex items-center gap-1 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg">
              {filterByStatus}
              <span>
                <ChevronDown />
              </span>
            </button>
          </Dropdown>
          <button
            onClick={resetSearchAndFilter}
            className="bg-gray-100 hover:bg-gray-300 transition-all duration-300 p-2 rounded-lg"
          >
            <RotateCcw />
          </button>
        </div>
      </div>
      <div className="my-6 md:my-8">
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default ManageOrdersPage;
