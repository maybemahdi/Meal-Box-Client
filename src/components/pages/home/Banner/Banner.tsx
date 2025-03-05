import Button from "@/components/shared/Button/Button";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=2070')] bg-cover bg-center bg-no-repeat opacity-25"></div>

      <div className="w-[90%] mx-auto md:px-4 py-16 md:py-32 relative">
        <div className="max-w-3xl">
          <h1 className="text-[30px] md:text-5xl lg:text-6xl xl:text-[80px] font-bold mb-6 leading-[1.2]">
            Delicious Meals,{" "}
            <span className="text-primary">Delivered Fresh</span>
          </h1>
          <p className="text-base xl:text-lg text-muted-foreground mb-6">
            Connect with local chefs and enjoy restaurant-quality meals
            delivered to your doorstep. Customize your meals, set your schedule,
            and eat better every day.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/find-meals">
              <Button label="Find Meals" customPY="12px" />
            </Link>
            <Link
              href="/login"
              className="text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Join as Provider
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
