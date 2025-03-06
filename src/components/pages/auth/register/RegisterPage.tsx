/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import authBg from "@/assets/images/auth-bg.png";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormCheckbox from "@/components/ui/MyForm/MyFormCheckbox/MyFormCheckbox";
import Button from "@/components/shared/Button/Button";
import { z } from "zod";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import { setUser } from "@/redux/features/auth/authSlice";
import MyFormSelect from "@/components/ui/MyForm/MyFormSelect/MyFormSelect";
import { toast } from "sonner";

const validationSchema = z.object({
  name: z
    .string({ required_error: "Name is Required" })
    .nonempty("Name must not be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  phoneNumber: z
    .string({ required_error: "Phone number is Required" })
    .min(10, "Phone number must be at least 10 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(["CUSTOMER", "PROVIDER"], {
    required_error: "Account type is required",
  }),
  isAgreed: z.boolean(),
});

// interface DecodedUser extends JwtPayload {
//   role: string;
// }

export default function RegisterPage() {
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    if (!formData?.isAgreed) {
      toast.error("Please agree to our terms and condition to register");
      return;
    }
    delete formData.isAgreed;
    const res = await handleAsyncWithToast(async () => {
      return register(formData); // Replace with your actual login function
    }, "Signing up...");
    if (res?.data?.success) {
      const response = await handleAsyncWithToast(async () => {
        return login({ email: formData?.email, password: formData?.password });
      }, "Logging in...");

      if (response?.data?.success) {
        const user = await verifyToken(response?.data?.data?.accessToken);
        console.log(user);
        await dispatch(
          setUser({
            user: user,
            access_token: response?.data?.data?.accessToken,
            refresh_token: response?.data?.data?.refreshToken,
          })
        );
        router.push("/");
        reset();
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-6px)] flex items-center justify-center relative">
      {/* Login Card */}
      <div className="bg-[#F2F4F7] rounded-md shadow-lg w-[90%] max-w-[800px] p-4 md:py-[48px] md:px-20 z-10 relative">
        <h1 className="text-3xl font-bold text-center text-title mb-8 uppercase">
          SIGN UP
        </h1>

        <div className="max-w-2xl mx-auto">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <div className="rounded-lg space-y-4">
              <MyFormInput
                name="name"
                label="Full Name"
                placeHolder="Enter your full name"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MyFormInput
                name="email"
                label="Email"
                placeHolder="Enter your email"
                type="email"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MyFormInput
                name="phoneNumber"
                label="Phone Number"
                placeHolder="Enter your phone number"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <MyFormInput
                name="password"
                label="Password"
                placeHolder="Enter your password"
                type="password"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <MyFormSelect
                name="role"
                label="Account Type"
                className="!w-full"
                placeHolder="Select your account type"
                options={[
                  { label: "Customer", value: "CUSTOMER" },
                  { label: "PROVIDER", value: "PROVIDER" },
                ]}
              />
              <MyFormCheckbox
                name="isAgreed"
                label="Agree to our terms and conditions?"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Sign up" fullWidth />
            </div>
          </MyFormWrapper>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-700 hover:text-green-800 underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
