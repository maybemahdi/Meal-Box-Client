/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useUpdateCustomerProfileMutation } from "@/redux/features/profile/profile.customer.api";

const updateCustomerProfileSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  dietaryPreferences: z.array(z.string()).optional(), // Optional array of strings
});

type UpdateCustomerProfile = z.infer<typeof updateCustomerProfileSchema>;

export default function CustomerProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);

  const [updateCustomerProfile] = useUpdateCustomerProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCustomerProfile>({
    resolver: zodResolver(updateCustomerProfileSchema),
  });

  const {
    data: me,
    isLoading: isMeLoading,
    isFetching: isMeFetching,
  } = useGetMeQuery(undefined);

  if (isMeLoading || isMeFetching) {
    return <Loading />;
  }

  const customer = me?.data;

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Kosher",
    "Halal",
  ];

  const handleDietaryChange = (preference: string) => {
    const updatedDietaryPreferences = [...dietaryPreferences];
    const index = updatedDietaryPreferences.indexOf(preference);
    if (index === -1) {
      updatedDietaryPreferences.push(preference);
    } else {
      updatedDietaryPreferences.splice(index, 1);
    }
    setDietaryPreferences(updatedDietaryPreferences);
  };

  const onSubmit = async (data: UpdateCustomerProfile) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      dietaryPreferences,
    };
    const res = await handleAsyncWithToast(async () => {
      return updateCustomerProfile(payload);
    }, "Updating...");
    if (res?.data?.success) {
      setIsSubmitting(false);
      reset();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">
              Customer Profile
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              Update Your Details
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your personal information and preferences
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  {...register("name")}
                  defaultValue={customer.name}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email (read only)
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  defaultValue={customer.email}
                  className="mt-1 block w-full px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-200 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="flex items-center text-base text-gray-500 bg-gray-200 rounded-lg border border-gray-300 px-3 py-2">
                    +88
                  </span>
                  <input
                    type="tel"
                    id="phoneNumber"
                    {...register("phoneNumber")}
                    defaultValue={customer.phoneNumber}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Dietary Preferences (current:{" "}
                  <span>
                    {Array.isArray(customer?.dietaryPreferences) &&
                    customer.dietaryPreferences.length > 0
                      ? customer.dietaryPreferences.join(", ")
                      : "N/A"}
                  </span>
                  )
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`diet-${option}`}
                        name="dietaryPreferences"
                        type="checkbox"
                        checked={
                          dietaryPreferences.includes(option) ||
                          customer?.dietaryPreferences?.includes(option)
                        }
                        onChange={() => handleDietaryChange(option)}
                        className="h-4 w-4 accent-primary text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`diet-${option}`}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  label={isSubmitting ? "Saving..." : "Save Changes"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
