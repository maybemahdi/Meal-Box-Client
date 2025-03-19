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
import { RotateCcw } from "lucide-react";
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
            <button className="flex items-center gap-1 text-gray-500 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg">
              Filter By
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M0.5 4.17587H8.64103C8.86559 5.08319 9.68634 5.75797 10.6621 5.75797C11.6378 5.75797 12.4585 5.08319 12.6831 4.17587H15.5C15.7761 4.17587 16 3.952 16 3.67587C16 3.39975 15.7761 3.17587 15.5 3.17587H12.6831C12.4585 2.26856 11.6378 1.59375 10.662 1.59375C9.68628 1.59375 8.86553 2.26856 8.641 3.17587H0.5C0.223875 3.17587 0 3.39975 0 3.67587C0 3.952 0.223875 4.17587 0.5 4.17587ZM10.6621 2.59375C11.2587 2.59375 11.7442 3.07919 11.7442 3.67584C11.7442 4.27253 11.2587 4.75797 10.6621 4.75797C10.0654 4.75797 9.57994 4.27253 9.57994 3.67584C9.57994 3.07919 10.0654 2.59375 10.6621 2.59375ZM0.5 8.5005H3.31694C3.5415 9.40781 4.36222 10.0826 5.33797 10.0826C6.31372 10.0826 7.13444 9.40781 7.359 8.5005H15.5C15.7761 8.5005 16 8.27662 16 8.0005C16 7.72437 15.7761 7.5005 15.5 7.5005H7.35897C7.13441 6.59319 6.31369 5.91838 5.33794 5.91838C4.36219 5.91838 3.54147 6.59319 3.31691 7.5005H0.5C0.223875 7.5005 0 7.72437 0 8.0005C0 8.27662 0.223844 8.5005 0.5 8.5005ZM5.33794 6.91838C5.93462 6.91838 6.42006 7.40381 6.42006 8.0005C6.42006 8.59716 5.93462 9.08259 5.33794 9.08259C4.74125 9.08259 4.25581 8.59716 4.25581 8.0005C4.25581 7.40381 4.74125 6.91838 5.33794 6.91838ZM15.5 11.8251H12.6831C12.4585 10.9178 11.6378 10.243 10.662 10.243C9.68628 10.243 8.86556 10.9178 8.641 11.8251H0.5C0.223875 11.8251 0 12.049 0 12.3251C0 12.6012 0.223875 12.8251 0.5 12.8251H8.64103C8.86559 13.7324 9.68631 14.4072 10.6621 14.4072C11.6378 14.4072 12.4585 13.7324 12.6831 12.8251H15.5C15.7761 12.8251 16 12.6012 16 12.3251C16 12.049 15.7762 11.8251 15.5 11.8251ZM10.6621 13.4072C10.0654 13.4072 9.57994 12.9218 9.57994 12.3251C9.57994 11.7284 10.0654 11.243 10.6621 11.243C11.2587 11.243 11.7442 11.7284 11.7442 12.3251C11.7442 12.9218 11.2587 13.4072 10.6621 13.4072Z"
                    fill="#6B6B6B"
                  />
                </svg>
              </span>
            </button>
          </Dropdown>
          <Dropdown
            menu={{ items: sortByRatingItems }}
            trigger={["click"]}
            placement="bottom"
            arrow
          >
            <button className="flex items-center gap-1 text-gray-500 bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg">
              Sort by rating
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M0.5 4.17587H8.64103C8.86559 5.08319 9.68634 5.75797 10.6621 5.75797C11.6378 5.75797 12.4585 5.08319 12.6831 4.17587H15.5C15.7761 4.17587 16 3.952 16 3.67587C16 3.39975 15.7761 3.17587 15.5 3.17587H12.6831C12.4585 2.26856 11.6378 1.59375 10.662 1.59375C9.68628 1.59375 8.86553 2.26856 8.641 3.17587H0.5C0.223875 3.17587 0 3.39975 0 3.67587C0 3.952 0.223875 4.17587 0.5 4.17587ZM10.6621 2.59375C11.2587 2.59375 11.7442 3.07919 11.7442 3.67584C11.7442 4.27253 11.2587 4.75797 10.6621 4.75797C10.0654 4.75797 9.57994 4.27253 9.57994 3.67584C9.57994 3.07919 10.0654 2.59375 10.6621 2.59375ZM0.5 8.5005H3.31694C3.5415 9.40781 4.36222 10.0826 5.33797 10.0826C6.31372 10.0826 7.13444 9.40781 7.359 8.5005H15.5C15.7761 8.5005 16 8.27662 16 8.0005C16 7.72437 15.7761 7.5005 15.5 7.5005H7.35897C7.13441 6.59319 6.31369 5.91838 5.33794 5.91838C4.36219 5.91838 3.54147 6.59319 3.31691 7.5005H0.5C0.223875 7.5005 0 7.72437 0 8.0005C0 8.27662 0.223844 8.5005 0.5 8.5005ZM5.33794 6.91838C5.93462 6.91838 6.42006 7.40381 6.42006 8.0005C6.42006 8.59716 5.93462 9.08259 5.33794 9.08259C4.74125 9.08259 4.25581 8.59716 4.25581 8.0005C4.25581 7.40381 4.74125 6.91838 5.33794 6.91838ZM15.5 11.8251H12.6831C12.4585 10.9178 11.6378 10.243 10.662 10.243C9.68628 10.243 8.86556 10.9178 8.641 11.8251H0.5C0.223875 11.8251 0 12.049 0 12.3251C0 12.6012 0.223875 12.8251 0.5 12.8251H8.64103C8.86559 13.7324 9.68631 14.4072 10.6621 14.4072C11.6378 14.4072 12.4585 13.7324 12.6831 12.8251H15.5C15.7761 12.8251 16 12.6012 16 12.3251C16 12.049 15.7762 11.8251 15.5 11.8251ZM10.6621 13.4072C10.0654 13.4072 9.57994 12.9218 9.57994 12.3251C9.57994 11.7284 10.0654 11.243 10.6621 11.243C11.2587 11.243 11.7442 11.7284 11.7442 12.3251C11.7442 12.9218 11.2587 13.4072 10.6621 13.4072Z"
                    fill="#6B6B6B"
                  />
                </svg>
              </span>
            </button>
          </Dropdown>
          <button
            onClick={resetSearchAndFilter}
            className="bg-gray-100 hover:bg-gray-300 text-gray-500 transition-all duration-300 p-2 rounded-lg"
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
