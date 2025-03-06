/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Button from "@/components/shared/Button/Button";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import {
  useOtpMutation,
  useResetPasswordMutation,
} from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { JwtPayload } from "jwt-decode";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { z } from "zod";

const validationSchema = z.object({
  newPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long"),
});

interface DecodedUser extends JwtPayload {
  email: string;
  role: string;
}

const CreateNewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifiedToken = token ? verifyToken(token as string) : null;
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();
  const emailForReset = (verifiedToken as DecodedUser)?.email;

  if (!token || !verifiedToken) {
    router.push("/login");
  }

  const handleSubmit = async (data: any, reset: any) => {
    const response = await handleAsyncWithToast(async () => {
      return resetPassword({
        userInfo: {
          email: emailForReset,
          newPassword: data?.newPassword,
        },
        token,
      });
    }, "Resetting password...");
    if (response?.data?.success) {
      router.push("/login");
      reset();
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center relative">
      {/* Login Card */}
      <div className="bg-[#F2F4F7] rounded-md shadow-lg w-[90%] max-w-[800px] px-4 py-8 md:py-[100px] md:px-20 z-10 relative">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <h1 className="text-[24px] md:text-3xl font-bold text-center text-title uppercase">
            Create New Password
          </h1>
          <p className="text-text-secondary text-center">
            Please save your new password
          </p>
        </div>

        <div className="max-w-xs mx-auto">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-3"
          >
            <MyFormInput
              name="newPassword"
              label="New Password"
              placeHolder="Enter your new password"
            />

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Save Password" fullWidth />
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
