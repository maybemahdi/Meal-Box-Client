/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Button from "@/components/shared/Button/Button";
import MyFormImageUpload from "@/components/ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useUpdateMealMutation } from "@/redux/features/meal/meal.provider.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSingleMealQuery } from "@/redux/features/meal/meal.customer.api";
import Loading from "@/components/shared/Loading/Loading";
import Image from "next/image";
import { cn } from "@/lib/utils";

const validationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  ingredients: z
    .string()
    .transform((val) => val.split(",").map((item) => item.trim()))
    .optional(),
  portionSize: z.enum(["Small", "Medium", "Large"]).optional(),
  image: z.instanceof(File).optional(),
  price: z.string().min(1, "Price must be a positive number").optional(),
  availability: z.enum(["yes", "no"]).optional(),
});

const EditMenu = () => {
  const router = useRouter();
  const [showImage, setShowImage] = useState(true);
  const searchParams = useSearchParams();
  const mealId = searchParams.get("id");
  if (!mealId) {
    router.push("/dashboard/provider/manage-menu");
  }
  const [updateMeal] = useUpdateMealMutation();
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetSingleMealQuery(mealId, {
    skip: !mealId,
  });
  const currentMeal = response?.data;

  const handleSubmit = async (data: any, reset: any) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append(
      "data",
      JSON.stringify({
        ...rest,
        price: Number(rest.price),
        availability:
          rest.availability !== undefined
            ? rest.availability === "yes"
            : currentMeal?.availability,
      })
    );
    const response = await handleAsyncWithToast(async () => {
      return updateMeal({ formData: formData, id: mealId });
    }, "Updating Meal...");
    if (response?.data?.success) {
      reset();
      router.push("/dashboard/provider/manage-menu");
    }
  };

  if (isLoading || isFetching) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary">Edit Menu</h2>
      <div className="my-6">
        <MyFormWrapper
          onSubmit={handleSubmit}
          resolver={zodResolver(validationSchema)}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="basis-1/2">
              <MyFormInput
                name="name"
                label="Menu Name"
                value={currentMeal?.name}
                placeHolder="Enter menu name"
              />
            </div>
            <div className="basis-1/2">
              <MyFormInput
                name="ingredients"
                label="Ingredients"
                value={
                  Array.isArray(currentMeal?.ingredients)
                    ? currentMeal?.ingredients.join(", ")
                    : currentMeal?.ingredients
                }
                placeHolder="Separate by comma (eg: beef patty, cheese, lettuce)"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="basis-1/2">
              <MyFormSelect
                name="portionSize"
                label="Portion Size"
                placeHolder="Select portion size"
                defaultValue={currentMeal?.portionSize}
                options={[
                  { value: "Small", label: "Small" },
                  { value: "Medium", label: "Medium" },
                  { value: "Large", label: "Large" },
                ]}
              />
            </div>
            <div className="basis-1/2">
              <MyFormInput
                name="price"
                label="Menu Price"
                value={String(currentMeal?.price)}
                placeHolder="Enter menu price"
              />
            </div>
          </div>
          <div>
            <MyFormTextArea
              name="description"
              label="Description"
              value={currentMeal?.description}
              placeHolder="Menu Description"
            />
          </div>
          <div>
            <MyFormSelect
              name="availability"
              label="Availability"
              placeHolder="Menu availability"
              defaultValue={currentMeal?.availability ? "yes" : "no"}
              options={[
                { value: "yes", label: "yes" },
                { value: "no", label: "no" },
              ]}
            />
          </div>
          <div className="space-y-3">
            <MyFormImageUpload
              name="image"
              label="Menu Image"
              labelClassName="text-text-secondary"
              previewImageClassName="h-96"
              showImage={showImage}
              setShowImage={setShowImage}
            >
              <div className="bg-white p-3 border rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer">
                <p className="ant-upload-drag-icon">
                  <UploadOutlined className="text-2xl" />
                </p>
                <p className="ant-upload-text">Upload menu image</p>
              </div>
            </MyFormImageUpload>
            {currentMeal?.image && showImage && (
              <div className={cn(" relative w-fit")}>
                <Image
                  height={100}
                  width={200}
                  src={currentMeal?.image}
                  alt="Preview"
                  className="rounded-md object-fill"
                />
              </div>
            )}
          </div>
          <div className="flex md:hidden justify-end">
            <Button label="Add Meal" type="submit" fullWidth />
          </div>
          <div className="hidden md:flex justify-end">
            <Button label="Update Menu" type="submit" />
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default EditMenu;
