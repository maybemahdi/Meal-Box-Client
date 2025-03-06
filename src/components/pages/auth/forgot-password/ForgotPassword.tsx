/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import Link from "next/link";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import Button from "@/components/shared/Button/Button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

const validationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

export default function ForgotPassword() {
  const [emailForForgotPasswordMutation] = useForgotPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return emailForForgotPasswordMutation(formData);
    }, "Sending Mail...");
    console.log(response?.data);
    if (response?.data?.success) {
      sessionStorage.setItem("emailForResetPassword", formData?.email);
      reset();
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center relative">
      {/* Login Card */}
      <div className="bg-[#F2F4F7] rounded-md shadow-lg w-[90%] max-w-[800px] px-4 py-8 md:py-[100px] md:px-20 z-10 relative">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <h1 className="text-[24px] md:text-3xl font-bold text-center text-title uppercase">
            Reset your password
          </h1>
          <p className="text-text-secondary text-center">
            Enter your account email to receive <br /> a password reset link
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-3"
          >
            <MyFormInput
              name="email"
              label="Email"
              placeHolder="Enter your email"
              type="email"
              inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Send" fullWidth />
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
}
