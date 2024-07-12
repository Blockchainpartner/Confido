import { Metadata } from "next";
import Hero from "@/components/Hero";


export const metadata: Metadata = {
  title: "Confido",
  description: "Confido for private payment systems",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />

    </main>
  );
}
