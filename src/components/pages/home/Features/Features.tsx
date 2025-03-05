import { Heart, Search, Truck } from 'lucide-react';
import React from 'react';

const Features = () => {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-[30px] md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 shadow-md rounded-xl">
              <Search className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Find Local Chefs</h3>
              <p className="text-muted-foreground">
                Browse through a variety of meal options from talented local
                chefs in your area.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-md">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Customize Your Meals
              </h3>
              <p className="text-muted-foreground">
                Select your preferences, dietary restrictions, and portion sizes
                for personalized meals.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl shadow-md">
              <Truck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Get Fresh Delivery</h3>
              <p className="text-muted-foreground">
                Enjoy fresh, chef-prepared meals delivered right to your
                doorstep on your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Features;