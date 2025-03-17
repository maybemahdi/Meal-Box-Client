/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ReactNode, useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  Bell,
  Search,
  User,
  Users,
  LogOut,
  Car,
  UtensilsCrossed,
  UserPen,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";
import { IoAdd } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const DashboardLayout = ({
  children,
  role,
}: {
  children: ReactNode;
  role?: string;
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const role = user?.role || "CUSTOMER";
  // const role = user?.role || "CUSTOMER";
  const router = useRouter();
  const pathName = usePathname();

  // console.log(user);
  let menuItems;
  if (role === "CUSTOMER") {
    menuItems = [
      { icon: Home, text: "Dashboard", path: "/dashboard/customer" },
      {
        icon: BarChart3,
        text: "Track Orders",
        path: "/dashboard/customer/my-orders",
      },
      {
        icon: Settings,
        text: "Manage Preferences",
        path: "/dashboard/customer/preferences",
      },
      {
        icon: UserPen,
        text: "Profile",
        path: "/dashboard/customer/profile",
      },
    ];
  }
  if (role === "PROVIDER") {
    menuItems = [
      { icon: Home, text: "Dashboard", path: "/dashboard/provider" },
      {
        icon: Utensils,
        text: "Manage Menu",
        path: "/dashboard/provider/manage-menu",
      },
      {
        icon: BarChart3,
        text: "Track Orders",
        path: "/dashboard/provider/manage-orders",
      },
      {
        icon: UserPen,
        text: "Profile",
        path: "/dashboard/provider/profile",
      },
    ];
  }
  if (role === "ADMIN") {
    menuItems = [
      { icon: Home, text: "Dashboard", path: "/dashboard" },
      {
        icon: BarChart3,
        text: "All Order",
        path: "/dashboard/orders",
      },
      {
        icon: Users,
        text: "User Management",
        path: "/dashboard/user-management",
      },
      {
        icon: UserPen,
        text: "Profile",
        path: "/dashboard/my-profile",
      },
    ];
  }
  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center justify-center cursor-pointer"
          >
            <Image src={logo} alt="Logo" height={70} width={70} />
            <p className="text-lg font-semibold mt-3">MealBox</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems?.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                pathName === item.path
                  ? "bg-blue-50 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.text}
            </Link>
          ))}
        </nav>
        {/* log out button  */}
        <div className="p-4 fixed bottom-2 w-full">
          <button
            onClick={() => {
              dispatch(logout());
              toast.success("Log out Successful");
              router.push("/login");
            }}
            className="flex items-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md ml-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="py-4 px-6 lg:px-8 mt-16">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
