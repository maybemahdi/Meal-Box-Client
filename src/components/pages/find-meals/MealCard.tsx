/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import Image from "next/image";
import { IMeal } from "@/types";
import { BsStarFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button/Button";
import MyModal from "@/components/shared/Modal/MyModal";
import { useState } from "react";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { z } from "zod";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useCreateReviewMutation } from "@/redux/features/review/review.api";

const validationSchema = z.object({
  comment: z.string({
    required_error: "Comment is required",
  }),
});

export const MealCard = ({
  meal,
  isProvider = false,
  userId,
}: {
  meal: IMeal;
  isProvider?: boolean;
  userId?: string;
}) => {
  const [rating, setRating] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    _id: mealId,
    name,
    description,
    image,
    price,
    portionSize,
    availability,
    ingredients,
    ratings,
  } = meal;
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async (formData: any, reset: any) => {
    const payload = {
      comment: formData?.comment,
      rating: Number(rating),
      userId: userId,
      mealId: mealId,
    };
    const res = await handleAsyncWithToast(async () => {
      return createReview(payload);
    }, "Submitting...");
    if (res?.data?.success) {
      setIsModalOpen(false);
      reset();
    }
  };
  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        {/* Availability badge */}
        {!availability && (
          <div className="absolute left-0 top-0 z-10 w-full bg-gray-800/80 p-2 text-center text-white">
            Currently Unavailable
          </div>
        )}

        {/* Image container with gradient overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image
            src={image || "/placeholder.svg?height=192&width=384"}
            alt={name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              !availability ? "grayscale" : ""
            }`}
          />

          {/* Price tag */}
          <div className="absolute right-3 top-3 z-10 rounded-full bg-white px-3 py-1 font-bold text-emerald-600 shadow-md">
            ${price.toFixed(2)}
          </div>

          {/* Portion size */}
          <div className="absolute bottom-3 left-3 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {portionSize}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 xs:h-[50%] md:h-[55%] sm:h-[58%] lg:h-[58%] flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="cursor-pointer text-xl font-bold text-gray-800 hover:underline transition-all duration-300">
              {name}
            </h3>
            <div className="flex items-center gap-1">
              <BsStarFill className="text-yellow-500 text-[20px]" />
              <p className="font-medium">{ratings?.toFixed(1)}</p>
            </div>
          </div>

          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {description.length > 50
              ? `${description.slice(0, 50)}...`
              : description}
          </p>

          {/* Ingredients */}
          <div className="mb-4 flex-grow">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">
              Ingredients:
            </h4>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div>
            {!isProvider ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/order-meal?mealId=${meal?._id}`);
                }}
                disabled={!availability}
                className={`mt-2 w-full rounded-lg py-2 text-center font-medium transition-colors ${
                  availability
                    ? "bg-primary text-white hover:bg-emerald-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {availability ? "Order Now" : "Not Available"}
              </button>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <Button
                  onClick={() =>
                    router.push(
                      `/dashboard/provider/manage-menu/edit-menu?id=${meal?._id}`
                    )
                  }
                  label="Edit"
                  fullWidth
                />
                <Button label="Delete" variant="outline" fullWidth />
              </div>
            )}
          </div>
        </div>
      </div>
      <MyModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        width={"85%"}
      >
        <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white overflow-hidden rounded-lg">
          {/* Left side - Image */}
          <div className="relative w-full md:w-1/2 h-64 md:h-auto rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-lg"></div>
            <Image
              src={image || "/placeholder.svg?height=400&width=400"}
              alt={name}
              fill
              priority
              className={`object-cover md:rounded-r-lg rounded-lg ${
                !availability ? "grayscale" : ""
              }`}
            />

            {/* Price tag */}
            <div className="absolute right-3 top-3 z-20 rounded-full bg-white px-3 py-1 font-bold text-emerald-600 shadow-md">
              ${price.toFixed(2)}
            </div>

            {/* Availability badge */}
            {!availability && (
              <div className="absolute left-0 top-0 rounded-t-lg z-10 w-full bg-gray-800/80 p-2 text-center text-white">
                Currently Unavailable
              </div>
            )}
          </div>

          {/* Right side - Details */}
          <div className="w-full md:w-1/2 md:p-6 py-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
              <div className="flex items-center gap-1">
                <BsStarFill className="text-yellow-500 text-[20px]" />
                <p className="font-medium">{ratings?.toFixed(1)}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Portion Size:
              </h3>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                {portionSize}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Description:
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Ingredients:
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients?.map((ingredient, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={(event) => {
                event.stopPropagation();
                router.push(`/order-meal?mealId=${meal?._id}`);
              }}
              disabled={!availability}
              className={`mt-2 w-full rounded-lg py-2 text-center font-medium transition-colors ${
                availability
                  ? "bg-primary text-white hover:bg-emerald-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {availability ? "Order Now" : "Not Available"}
            </button>

            {/* review  */}
            <div className="mt-5">
              <div className="flex">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={rating}
                  onChange={setRating}
                  itemStyles={{
                    itemShapes: Star,
                    activeFillColor: "#F79F39",
                    inactiveFillColor: "#E6E8EC",
                  }}
                  isRequired
                />
              </div>

              {/* Form */}
              <MyFormWrapper
                onSubmit={handleSubmit}
                resolver={zodResolver(validationSchema)}
                className="flex flex-col gap-5 mb-5"
              >
                <div className="w-full">
                  <MyFormTextArea name={"comment"} label="Rate the meal" />
                </div>
                <Button label={"Submit"} type="submit" />
              </MyFormWrapper>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
};
