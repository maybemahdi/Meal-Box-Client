import { ChefHat, Clock, Star, TrendingUp } from "lucide-react";
import React from "react";

const Benefits = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-[30px] md:text-4xl font-bold text-center mb-16">
          Why Choose MealBox?
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <ChefHat className="w-8 h-8" />,
              title: "Professional Chefs",
              description: "Meals prepared by verified local chefs",
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Flexible Scheduling",
              description: "Choose delivery times that work for you",
            },
            {
              icon: <Star className="w-8 h-8" />,
              title: "Quality Assured",
              description: "Fresh ingredients and quality standards",
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Custom Portions",
              description: "Meals sized to your specifications",
            },
          ].map((benefit, index) => (
            <div key={index} className="text-center p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
