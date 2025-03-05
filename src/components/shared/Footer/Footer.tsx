import { MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white py-12">
      <div className="md:container w-[90%] mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">MealBox</h3>
            <p className="text-muted-foreground">
              Connecting food lovers with talented local chefs for fresh,
              personalized meals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Customers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/find-meals">Find Meals</Link>
              </li>
              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/dashboard/customer">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Providers</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/login">Provider Login</Link>
              </li>
              <li>
                <Link href="/dashboard/provider">Provider Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/post-meal-menu">Post Menu</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>support@mealbox.com</li>
              <li>1-800-MEALBOX</li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Available in major cities
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MealBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
