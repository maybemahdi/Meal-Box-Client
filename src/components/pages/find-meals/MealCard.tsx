"use client";
import type React from "react";
import Image from "next/image";
import { IMeal } from "@/types";
import { BsStarFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Button from "@/components/shared/Button/Button";

export const MealCard = ({
  meal,
  isProvider = false,
}: {
  meal: IMeal;
  isProvider?: boolean;
}) => {
  const router = useRouter();
  const {
    name,
    description,
    image,
    price,
    portionSize,
    availability,
    ingredients,
    ratings,
  } = meal;
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
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
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <div className="flex items-center gap-1">
            <BsStarFill className="text-yellow-500 text-[20px]" />
            <p className="font-medium">{ratings?.toFixed(1)}</p>
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Ingredients */}
        <div className="mb-4">
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
        {!isProvider ? (
          <button
            onClick={() => router.push(`/order-meal?mealId=${meal?._id}`)}
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
            <Button label="Edit" fullWidth />
            <Button label="Delete" variant="outline" fullWidth />
          </div>
        )}
      </div>
    </div>
  );
};
