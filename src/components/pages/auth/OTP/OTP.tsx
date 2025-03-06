/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Button from '@/components/shared/Button/Button';
import MyFormOTP from '@/components/ui/MyForm/MyFormOTP/MyFormOTP';
import MyFormWrapper from '@/components/ui/MyForm/MyFormWrapper/MyFormWrapper';
import { useOtpMutation } from '@/redux/features/auth/authApi';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

const validationSchema = z.object({
  otp: z
    .string({
      required_error: 'Verification code is required',
    })
    .length(4, 'Verification code must be 4 digits long')
    .regex(/^\d{4}$/, 'Verification code must be numeric'),
});

const OTP = () => {
  const [otpMutation] = useOtpMutation();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    console.log(formData);
    // const response = await handleAsyncWithToast(async () => {
    //   return otpMutation({ otp: Number(formData.otp) }); // Replace with your actual login function
    // }, "Validating OTP");
    // if (response?.data?.success) {
    //   router.push('/auth/create-new-password');
    //   reset();
    // }
  };
  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center relative">
      {/* Login Card */}
      <div className="bg-[#F2F4F7] rounded-md shadow-lg w-[90%] max-w-[800px] px-4 py-8 md:py-[100px] md:px-20 z-10 relative">
        {/* Skip button */}
        <div className="hidden md:block absolute top-4 left-4 md:top-16 md:left-16">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
            >
              <path
                d="M17 7H1M1 7L7 13M1 7L7 1"
                stroke="#3B3333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <h1 className="text-[24px] md:text-3xl font-bold text-center text-title uppercase">
            OTP
          </h1>
          <p className="text-text-secondary text-center">
            Please Enter your OTP
          </p>
        </div>

        <div className="max-w-xs mx-auto">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <div className="rounded-lg space-y-4">
              <MyFormOTP name="otp" length={4} className="h-6" />
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Submit" fullWidth />
            </div>
          </MyFormWrapper>
        </div>
      </div>
    </div>
  );
};

export default OTP;
