/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Button from "@/components/shared/Button/Button";
import MyFormImageUpload from "@/components/ui/MyForm/MyFormImageUpload/MyFormImageUpload";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import MyFormTextArea from "@/components/ui/MyForm/MyFormTextArea/MyFormTextArea";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useCreateMealMutation } from "@/redux/features/meal/meal.provider.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadOutlined } from "@ant-design/icons";

const validationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  ingredients: z
    .string()
    .nonempty("At least one ingredient is required")
    .transform((val) => val.split(",").map((item) => item.trim())),
  portionSize: z.enum(["Small", "Medium", "Large"], {
    errorMap: () => ({
      message: "Portion size must be Small, Medium, or Large",
    }),
  }),
  image: z.instanceof(File),
  price: z.string().min(1, "Price must be a positive number"),
  availability: z.boolean().default(true),
});

const AddMenu = () => {
  const [resetTrigger, setResetTrigger] = useState(false);
  const [createMeal] = useCreateMealMutation();
  const handleSubmit = async (data: any, reset: any) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append(
      "data",
      JSON.stringify({ ...rest, price: Number(rest.price) })
    );
    const response = await handleAsyncWithToast(async () => {
      return createMeal(formData);
    }, "Adding Meal...");
    if (response?.data?.success) {
      reset();
      setResetTrigger((prev) => !prev);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-text-primary">Add Menu</h2>
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
                placeHolder="Enter menu name"
              />
            </div>
            <div className="basis-1/2">
              <MyFormInput
                name="ingredients"
                label="Ingredients"
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
                placeHolder="Enter menu price"
              />
            </div>
          </div>
          <div>
            <MyFormTextArea
              name="description"
              label="Description"
              placeHolder="Menu Description"
            />
          </div>
          <div>
            <MyFormImageUpload
              name="image"
              label="Menu Image"
              labelClassName="text-text-secondary"
              previewImageClassName="h-96"
              resetTrigger={resetTrigger}
            >
              <div className="bg-white p-3 border rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer">
                <p className="ant-upload-drag-icon">
                  <UploadOutlined className="text-2xl" />
                </p>
                <p className="ant-upload-text">Upload menu image</p>
              </div>
            </MyFormImageUpload>
          </div>
          <div className="flex md:hidden justify-end">
            <Button label="Add Meal" type="submit" fullWidth />
          </div>
          <div className="hidden md:flex justify-end">
            <Button label="Add Menu" type="submit" />
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default AddMenu;
