/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/components/shared/Loading/Loading";
import { useGetAllMealQuery } from "@/redux/features/meal/meal.customer.api";
import { IMeal } from "@/types";
import React, { useEffect, useState } from "react";
import { MealCard } from "./MealCard";
import { Dropdown, MenuProps, Pagination } from "antd";
import "./findMeal.css";
import Search, { SearchProps } from "antd/es/input/Search";

const FindMealsPage = () => {
  const [filterBy, setFilterBy] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState<{ name: string; value: any }[]>(
    []
  );

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([
    { name: "page", value: page },
    { name: "limit", value: pageSize },
    { name: "searchTerms", value: searchText },
  ]);

  useEffect(() => {
    setObjectQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      ...searchText,
    ]);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
    setObjectQuery([
      { name: "page", value: 1 },
      { name: "limit", value: pageSize },
      ...searchText,
    ]);
  }, [searchText]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllMealQuery(objectQuery);

  const onSearch: SearchProps["onSearch"] = (value) =>
    setSearchText([{ name: "searchTerm", value: value }]);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  const meals = response?.data?.meals;
  if (!meals?.length) {
    return (
      <div className="w-full mx-auto flex items-center justify-center h-[70vh]">
        <p className="text-2xl font-semibold text-primary">No meal found</p>
      </div>
    );
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => setFilterBy("All")}
          rel="noopener noreferrer"
          className="text-primary w-full text-start"
        >
          Available
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => setFilterBy("In Progress")}
          rel="noopener noreferrer"
          className="text-red-500 w-full text-start"
        >
          Not Available
        </button>
      ),
    },
  ];
  return (
    <div className="w-[90%] mx-auto my-8 md:my-12 md:px-4 space-y-6">
      {/* search and filter  */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-5">
        {/* search bar */}
        <div>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottom"
            arrow
          >
            <button
              className="bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg"
            >
              {filterBy ? filterBy : "Filter By"}
            </button>
          </Dropdown>
        </div>
        {/* filter options */}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals?.map((meal: IMeal) => (
          <MealCard key={meal?._id} meal={meal} />
        ))}
      </div>
      <div className="p-4 w-full flex justify-center items-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={response?.data?.meta?.totalCount}
          onChange={handlePaginationChange}
          className="custom-pagination"
          //   showSizeChanger
          //   pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default FindMealsPage;
