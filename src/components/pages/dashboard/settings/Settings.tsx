"use client";
import Button from "@/components/shared/Button/Button";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { FormEvent } from "react";

const Settings = () => {
  const [changePassword] = useChangePasswordMutation();
  const handlePasswordChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const oldPassword = (form as HTMLFormElement).currentPassword.value;
    const newPassword = (form as HTMLFormElement).newPassword.value;
    const payload = {
      oldPassword,
      newPassword,
    };
    await handleAsyncWithToast(async () => {
      return changePassword(payload);
    }, "Changing password...");
    form.reset();
  };
  return (
    <form onSubmit={handlePasswordChange} className="mx-auto mb-0 space-y-4">
      <div>
        <div className="relative mt-2">
          <label className="text-sm">Current Password</label>
          <input
            placeholder="Current Password"
            className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            name="currentPassword"
            type="password"
            required
          />
        </div>
      </div>
      <div>
        <div className="relative">
          <label className="text-sm">New Password</label>
          <input
            placeholder="New Password"
            className="w-full bg-slate-200 rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mt-2"
            name="newPassword"
            type="password"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center justify-between">
        <Button type="submit" label="Change Password" fullWidth />
      </div>
    </form>
  );
};

export default Settings;
