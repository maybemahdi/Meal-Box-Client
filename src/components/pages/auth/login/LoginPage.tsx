/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import MyFormWrapper from '@/components/ui/MyForm/MyFormWrapper/MyFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import MyFormInput from '@/components/ui/MyForm/MyFormInput/MyFormInput';
import MyFormCheckbox from '@/components/ui/MyForm/MyFormCheckbox/MyFormCheckbox';
import Button from '@/components/shared/Button/Button';
import { z } from 'zod';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { handleAsyncWithToast } from '@/utils/handleAsyncWithToast';
import { verifyToken } from '@/utils/verifyToken';
import { JwtPayload } from 'jwt-decode';
import { setUser } from '@/redux/features/auth/authSlice';

const validationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    }),
  rememberMe: z.boolean().default(false),
});

interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (formData: any, reset: any) => {
    console.log(formData);
    const response = await handleAsyncWithToast(async () => {
      return login(formData);
    }, 'Login in...');
    if (response?.data?.success) {
      const user = (await verifyToken(
        response?.data?.data?.accessToken
      )) as DecodedUser;
      console.log(user);
      await dispatch(
        setUser({
          user: user,
          access_token: response?.data?.data?.accessToken,
          refresh_token: response?.data?.data?.refreshToken,
        })
      );
      reset();
      router.push('/');
    }
  };

  return (
    <div className="min-h-[calc(100vh-96px)] flex items-center justify-center relative">
      {/* Login Card */}
      <div className="bg-[#F2F4F7] rounded-md shadow-lg w-[90%] max-w-[800px] px-4 py-8 md:py-[100px] md:px-20 z-10 relative">
        <h1 className="text-3xl font-bold text-center text-title mb-8 uppercase">
          LOG IN
        </h1>

        <div className="max-w-md mx-auto">
          <MyFormWrapper
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
            className="space-y-6"
          >
            <div className="rounded-lg space-y-4">
              <MyFormInput
                name="email"
                label="Email"
                placeHolder="Enter your email"
                type="email"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <MyFormInput
                name="password"
                label="Password"
                placeHolder="Enter your password"
                type="password"
                inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <MyFormCheckbox
                  name="rememberMe"
                  label="Remember Me"
                  checkboxClassName="rounded"
                  labelClassName="whitespace-nowrap text-text-secondary text-wrap"
                />
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:text-blue-600 text-sm  whitespace-nowrap"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Log in" fullWidth />
            </div>
          </MyFormWrapper>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-green-700 hover:text-green-800 underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
