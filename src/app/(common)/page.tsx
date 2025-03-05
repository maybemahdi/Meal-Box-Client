import Banner from "@/components/pages/home/Banner/Banner";
import Benefits from "@/components/pages/home/Benefits/Benefits";
import CTA from "@/components/pages/home/CTA/CTA";
import Features from "@/components/pages/home/Features/Features";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <Features />
      <Benefits />
      <CTA />
    </main>
  );
}
