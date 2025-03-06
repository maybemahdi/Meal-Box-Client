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
} from "lucide-react";
import { toast } from "sonner";
import { IoAdd } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";

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
      { icon: Home, text: "Dashboard", path: "/dashboard/customer" },
      {
        icon: BarChart3,
        text: "Track Orders",
        path: "/dashboard/customer/my-orders",
      },
      {
        icon: UtensilsCrossed,
        text: "Manage Meals",
        path: "/dashboard/customer/manage-meals",
      },
      {
        icon: UserPen,
        text: "Profile",
        path: "/dashboard/customer/profile",
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
          <span className="text-xl font-semibold text-gray-800">Dashboard</span>
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
        <main className="py-4 px-6 lg:px-8 mt-16">
          {/* <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Card Title {item}
                  </h3>
                  <p className="text-gray-600">
                    This is a sample card with some content. Replace this with
                    your actual dashboard widgets.
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Activity
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[1, 2, 3].map((item) => (
                      <tr key={item}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            User {item}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-03-{item}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
          {children}
        </main>
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
