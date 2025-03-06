"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { menuItems } from "@/data/menuItems";
import Button from "../Button/Button";
import { LogOut, Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentToken } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { JwtPayload } from "jwt-decode";
import Swal from "sweetalert2";

interface DecodedUser extends JwtPayload {
  role: string;
}
const NavBar = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentUserToken = useAppSelector(selectCurrentToken);
  const currentUser = currentUserToken ? verifyToken(currentUserToken) : null;

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire({
          title: "Successful!",
          text: "Your have been logged out.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-[1000]">
      <div className="flex justify-between items-center w-[90%] mx-auto md:py-1">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center justify-center cursor-pointer"
        >
          <Image src={logo} alt="Logo" height={80} width={80} />
          <p className="text-lg font-semibold mt-3">MealBox</p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center gap-12 items-center">
          {menuItems.map((menu, idx) => (
            <Link
              href={menu.path}
              key={idx}
              className={cn(
                "text-text-primary text-base hover:text-primary transition-all duration-300",
                { "text-primary font-semibold": pathname === menu.path }
              )}
            >
              {menu.title}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        {currentUser ? (
          <div className="hidden lg:flex gap-5">
            <Button
              onClick={() =>
                router.push(
                  `/dashboard/${(
                    currentUser as DecodedUser
                  )?.role.toLowerCase()}`
                )
              }
              label="Dashboard"
              variant="outline"
            />
            <button
              onClick={handleLogOut}
              className="bg-slate-100 hover:bg-slate-200 transition-all duration-300 px-3 py-2 rounded-md text-gray-500"
            >
              <LogOut />
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-5">
            <Button
              onClick={() => router.push("/register")}
              label="Sign up"
              variant="outline"
            />
            <Button
              onClick={() => router.push("/login")}
              label="Sign in"
              variant="filled"
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300",
          {
            "opacity-100 visible": isDrawerOpen,
            "opacity-0 invisible": !isDrawerOpen,
          }
        )}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={cn(
            "fixed top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-lg p-5 flex flex-col transform transition-transform duration-500",
            { "translate-x-0": isDrawerOpen, "translate-x-full": !isDrawerOpen }
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="self-end mb-4"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={28} />
          </button>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-5">
            {menuItems.map((menu, idx) => (
              <Link
                href={menu.path}
                key={idx}
                className={cn(
                  "text-text-primary text-lg hover:text-primary transition-all duration-300",
                  { "text-primary font-semibold": pathname === menu.path }
                )}
                onClick={() => setIsDrawerOpen(false)}
              >
                {menu.title}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          {currentUser ? (
            <div className="lg:hidden flex flex-col gap-5 mt-5">
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/${(
                      currentUser as DecodedUser
                    )?.role.toLowerCase()}`
                  )
                }
                label="Dashboard"
                variant="outline"
                fullWidth
              />
              <button
                onClick={handleLogOut}
                className="bg-slate-100 flex items-center gap-2 justify-center hover:bg-slate-200 transition-all duration-300 px-3 py-2 rounded-md text-gray-500"
              >
                <LogOut /> Sign out
              </button>
            </div>
          ) : (
            <div className="lg:hidden flex flex-col gap-5 mt-5">
              <Button
                onClick={() => router.push("/register")}
                label="Sign up"
                variant="outline"
                fullWidth
              />
              <Button
                onClick={() => router.push("/login")}
                label="Sign in"
                variant="filled"
                fullWidth
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
