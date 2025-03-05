"use client";

import Button from "@/components/shared/Button/Button";
import {
  Award,
  ChefHat,
  Globe,
  HeartHandshake,
  History,
  Leaf,
  Shield,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground">
              Building connections between talented chefs and food lovers, one
              meal at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070"
                alt="Chef preparing a meal"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-base text-muted-foreground mb-6">
                At MealBox, we&apos;re on a mission to revolutionize the way
                people experience food. We believe everyone deserves access to
                delicious, chef-prepared meals that cater to their unique
                preferences and dietary needs.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: <HeartHandshake className="w-6 h-6" />,
                    title: "Community First",
                    description:
                      "Supporting local chefs and creating meaningful connections",
                  },
                  {
                    icon: <Leaf className="w-6 h-6" />,
                    title: "Sustainability",
                    description:
                      "Committed to eco-friendly packaging and reducing food waste",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Quality Assured",
                    description:
                      "Rigorous standards for food safety and chef verification",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-primary">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {[
              {
                year: "2021",
                title: "The Beginning",
                description:
                  "MealBox was founded with a vision to connect local chefs with food enthusiasts.",
              },
              {
                year: "2022",
                title: "Rapid Growth",
                description:
                  "Expanded to 10 major cities and onboarded over 1,000 professional chefs.",
              },
              {
                year: "2023",
                title: "Innovation",
                description:
                  "Launched our advanced meal customization platform and sustainable packaging initiative.",
              },
              {
                year: "2024",
                title: "Community Impact",
                description:
                  "Reached 100,000 satisfied customers and launched our chef empowerment program.",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    <History className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-xl mb-2">{milestone.year}</div>
                  <h3 className="font-semibold text-lg mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Users2 className="w-8 h-8" />,
                number: "100,000+",
                label: "Happy Customers",
              },
              {
                icon: <ChefHat className="w-8 h-8" />,
                number: "1,000+",
                label: "Professional Chefs",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                number: "10+",
                label: "Cities Covered",
              },
              {
                icon: <Award className="w-8 h-8" />,
                number: "4.8/5",
                label: "Customer Rating",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-base mb-8 opacity-90">
            Whether you&apos;re a food lover or a talented chef, there&apos;s a
            place for you at MealBox.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Link
              href="/find-meals"
              className="bg-background text-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Order Now
            </Link>
            <Link href="/login">
              <Button label="Become a Chef" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
