/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { useGetAllMealQuery } from "@/redux/features/meal/meal.customer.api";
import { IMeal } from "@/types";
import { useEffect, useState } from "react";
import { Dropdown, MenuProps, Pagination } from "antd";
import "@/components/pages/find-meals/findMeal.css";
import Search, { SearchProps } from "antd/es/input/Search";
import { ChevronDown, RotateCcw } from "lucide-react";
import { MealCard } from "@/components/pages/find-meals/MealCard";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useDeleteMealMutation } from "@/redux/features/meal/meal.provider.api";

const ManageMenuPage = () => {
  const [filterByAvailability, setFilterByAvailability] = useState("All");
  const [sortByRating, setSortByRating] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [searchText, setSearchText] = useState<{ name: string; value: any }[]>(
    []
  );
  const router = useRouter();

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([]);

  useEffect(() => {
    setObjectQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      { name: "availability", value: filterByAvailability },
      { name: "sort", value: sortByRating },
      ...searchText,
    ]);
  }, [page, pageSize, filterByAvailability, sortByRating]);

  useEffect(() => {
    setPage(1);
    setObjectQuery([
      { name: "page", value: 1 },
      { name: "limit", value: pageSize },
      { name: "availability", value: filterByAvailability },
      { name: "sort", value: sortByRating },
      ...searchText,
    ]);
  }, [searchText]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllMealQuery(objectQuery);

  const [deleteMeal] = useDeleteMealMutation();

  const onSearch: SearchProps["onSearch"] = (value) =>
    setSearchText([{ name: "searchTerm", value: value }]);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  const meals = response?.data?.meals;
  const resetSearchAndFilter = () => {
    setFilterByAvailability("All");
    setSortByRating("");
    setSearchText([]);
    setPage(1);
  };
  const filterItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => setFilterByAvailability("All")}
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
          onClick={() => setFilterByAvailability("Available")}
          rel="noopener noreferrer"
          className="text-primary w-full text-start"
        >
          Available
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => setFilterByAvailability("Not Available")}
          rel="noopener noreferrer"
          className="text-red-500 w-full text-start"
        >
          Not Available
        </button>
      ),
    },
  ];
  const sortByRatingItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => setSortByRating("l2h")}
          rel="noopener noreferrer"
          className="text-gray-500 w-full text-start"
        >
          Low to high
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => setSortByRating("h2l")}
          rel="noopener noreferrer"
          className="text-gray-500 w-full text-start"
        >
          High to low
        </button>
      ),
    },
  ];

  const onDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await handleAsyncWithToast(async () => {
          return deleteMeal(id);
        }, "Deleting...");
        if (res?.data?.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your menu has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Menu</h2>
        <Button
          label="Add Menu"
          onClick={() =>
            router.push("/dashboard/provider/manage-menu/add-menu")
          }
        />
      </div>
      {/* Menu List */}
      {/* search and filter  */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-5">
        {/* search bar */}
        <div className="w-full md:basis-2/5">
          <Search
            placeholder="Search Meal"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Dropdown
            menu={{ items: filterItems }}
            trigger={["click"]}
            placement="bottom"
            arrow
          >
            <button className="flex items-center gap-1 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg">
              Filter By
              <span>
                <ChevronDown />
              </span>
            </button>
          </Dropdown>
          <Dropdown
            menu={{ items: sortByRatingItems }}
            trigger={["click"]}
            placement="bottom"
            arrow
          >
            <button className="flex items-center gap-1 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg">
              Sort by rating
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
        {/* filter options */}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals?.length ? (
          meals?.map((meal: IMeal) => (
            <MealCard
              key={meal?._id}
              meal={meal}
              isProvider={true}
              onEdit={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                router.push(
                  `/dashboard/provider/manage-menu/edit-menu?id=${meal?._id}`
                );
              }}
              onDelete={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                onDelete(meal?._id);
              }}
            />
          ))
        ) : (
          <div className="w-full col-span-4 mx-auto flex items-center justify-center h-[40vh]">
            <p className="text-2xl font-semibold text-primary">No meal found</p>
          </div>
        )}
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

export default ManageMenuPage;
