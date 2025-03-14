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
import { useUpdateProviderProfileMutation } from "@/redux/features/profile/profile.provider";

const updateProviderProfileSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  dietaryPreferences: z.array(z.string()).optional(), // Optional array of strings
});

type UpdateProviderProfile = z.infer<typeof updateProviderProfileSchema>;

export default function ProviderProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);

  const [updateProviderProfile] = useUpdateProviderProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProviderProfile>({
    resolver: zodResolver(updateProviderProfileSchema),
  });

  const {
    data: me,
    isLoading: isMeLoading,
    isFetching: isMeFetching,
  } = useGetMeQuery(undefined);

  if (isMeLoading || isMeFetching) {
    return <Loading />;
  }

  const provider = me?.data;

  const cuisineSpecialties = [
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "Japanese",
    "Mediterranean",
  ];

  const handleCuisinePreferencesChange = (preference: string) => {
    const updatedCuisinePreferences = [...cuisinePreferences];
    const index = updatedCuisinePreferences.indexOf(preference);
    if (index === -1) {
      updatedCuisinePreferences.push(preference);
    } else {
      updatedCuisinePreferences.splice(index, 1);
    }
    setCuisinePreferences(updatedCuisinePreferences);
  };

  const onSubmit = async (data: UpdateProviderProfile) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      cuisineSpecialties: cuisinePreferences,
    };
    const res = await handleAsyncWithToast(async () => {
      return updateProviderProfile(payload);
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
              Provider Profile
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
                  Business Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  {...register("name")}
                  defaultValue={provider.name}
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
                  defaultValue={provider.email}
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
                    defaultValue={provider.phoneNumber}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Specialties (current:{" "}
                  <span>
                    {Array.isArray(provider?.cuisineSpecialties) &&
                    provider.cuisineSpecialties.length > 0
                      ? provider.cuisineSpecialties.join(", ")
                      : "N/A"}
                  </span>
                  )
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {cuisineSpecialties.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        id={`diet-${option}`}
                        name="dietaryPreferences"
                        type="checkbox"
                        checked={
                          cuisinePreferences.includes(option) ||
                          provider?.cuisineSpecialties?.includes(option)
                        }
                        onChange={() => handleCuisinePreferencesChange(option)}
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
